const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Node.js fonctionne !");
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ─── Authentification Professeur ───

app.post("/api/auth/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const resultat = await pool.query(
      "SELECT * FROM professeurs WHERE email = $1",
      [email],
    );
    const professeur = resultat.rows[0];

    if (!professeur) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const motDePasseValide = await bcrypt.compare(
      mot_de_passe,
      professeur.mot_de_passe,
    );

    if (!motDePasseValide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: professeur.id, role: "professeur" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      professeur: {
        id: professeur.id,
        nom: professeur.nom,
        prenom: professeur.prenom,
        email: professeur.email,
        grade: professeur.grade,
        departement: professeur.departement,
      },
    });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});
// Vérifie le token JWT et attache le professeur connecté à req.user
function verifierToken(req, res, next) {
  const enTete = req.headers.authorization;

  if (!enTete || !enTete.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = enTete.split(" ")[1];

  try {
    const donnees = jwt.verify(token, process.env.JWT_SECRET);
    req.user = donnees; // contient { id, role }
    next();
  } catch (erreur) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}
// ─── Laboratoires ───

app.get("/api/laboratoires", verifierToken, async (req, res) => {
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "SELECT * FROM laboratoires WHERE id_professeur = $1",
      [idProfesseur],
    );
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des laboratoires" });
  }
});

app.post("/api/laboratoires", verifierToken, async (req, res) => {
  const { nom, description, domaine } = req.body;
  const idProfesseur = req.user.id; // récupéré automatiquement grâce au token
  try {
    const resultat = await pool.query(
      "INSERT INTO laboratoires (nom, description, domaine, id_professeur) VALUES ($1, $2, $3, $4) RETURNING *",
      [nom, description, domaine, idProfesseur],
    );
    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du laboratoire" });
  }
});
// ─── Travaux pratiques ───

app.get("/api/travaux", async (req, res) => {
  try {
    const resultat = await pool.query("SELECT * FROM travaux_pratiques");
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({
      message: "Erreur lors de la récupération des travaux pratiques",
    });
  }
});

// ─── Soumissions ───
// id_etudiant temporairement fixé à 1, en attendant la vraie authentification étudiant

app.get("/api/soumissions", async (req, res) => {
  try {
    const resultat = await pool.query("SELECT * FROM soumissions");
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des soumissions" });
  }
});

app.post("/api/soumissions", async (req, res) => {
  const { titre, id_travail_pratique } = req.body;
  const idEtudiant = 1; // temporaire, en attendant l'authentification étudiant
  try {
    const resultat = await pool.query(
      "INSERT INTO soumissions (titre, statut, date_soumission, id_etudiant, id_travail_pratique) VALUES ($1, $2, NOW(), $3, $4) RETURNING *",
      [titre, "en attente", idEtudiant, id_travail_pratique],
    );
    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la soumission" });
  }
});

// ─── Profil étudiant ───
// Donnée temporaire liée à l'id 1, en attendant la vraie authentification

app.get("/api/profil", async (req, res) => {
  try {
    const resultat = await pool.query("SELECT * FROM etudiants WHERE id = 1");
    res.json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du profil" });
  }
});

app.put("/api/profil", async (req, res) => {
  const { nom, prenom, email } = req.body;
  try {
    const resultat = await pool.query(
      "UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = 1 RETURNING *",
      [nom, prenom, email],
    );
    res.json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du profil" });
  }
});
// ─── Travaux pratiques (Professeur) ───

app.get("/api/professeur/travaux", verifierToken, async (req, res) => {
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "SELECT * FROM travaux_pratiques WHERE id_professeur = $1",
      [idProfesseur],
    );
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({
      message: "Erreur lors de la récupération des travaux pratiques",
    });
  }
});

app.post("/api/professeur/travaux", verifierToken, async (req, res) => {
  const { titre, description, date_limite } = req.body;
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "INSERT INTO travaux_pratiques (titre, description, date_limite, id_professeur) VALUES ($1, $2, $3, $4) RETURNING *",
      [titre, description, date_limite, idProfesseur],
    );
    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du travail pratique" });
  }
});
// ─── Articles (Professeur) ───

app.get("/api/professeur/articles", verifierToken, async (req, res) => {
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "SELECT * FROM articles WHERE id_professeur = $1 ORDER BY date_publication DESC",
      [idProfesseur],
    );
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des articles" });
  }
});

app.post("/api/professeur/articles", verifierToken, async (req, res) => {
  const { titre, resume, contenu, categorie } = req.body;
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "INSERT INTO articles (titre, resume, contenu, categorie, id_professeur) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [titre, resume, contenu, categorie, idProfesseur],
    );
    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'article" });
  }
});

// ─── Évaluations (Professeur) ───

// Liste les soumissions à évaluer, avec le titre du travail et le nom de l'étudiant
app.get("/api/professeur/soumissions", verifierToken, async (req, res) => {
  try {
    const resultat = await pool.query(`
      SELECT s.*, e.nom AS nom_etudiant, e.prenom AS prenom_etudiant
      FROM soumissions s
      JOIN etudiants e ON s.id_etudiant = e.id
      ORDER BY s.date_soumission DESC
    `);
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des soumissions" });
  }
});

app.post("/api/professeur/evaluations", verifierToken, async (req, res) => {
  const { id_soumission, note, commentaire } = req.body;
  const idProfesseur = req.user.id;
  try {
    const resultat = await pool.query(
      "INSERT INTO evaluations (note, commentaire, id_soumission, id_professeur) VALUES ($1, $2, $3, $4) RETURNING *",
      [note, commentaire, id_soumission, idProfesseur],
    );

    // On met aussi à jour le statut de la soumission
    await pool.query("UPDATE soumissions SET statut = $1 WHERE id = $2", [
      "évalué",
      id_soumission,
    ]);

    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'évaluation" });
  }
});
app.listen(5000, () => {
  console.log("Serveur lancé sur le port 5000");
});
