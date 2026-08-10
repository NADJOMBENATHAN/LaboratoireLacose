const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Node.js fonctionne !");
});

// Données simulées côté backend pour l'instant —
// seront remplacées par de vraies requêtes PostgreSQL une fois la base connectée
// Route qui récupère les laboratoires depuis la vraie base PostgreSQL
app.get("/api/laboratoires", async (req, res) => {
  try {
    const resultat = await pool.query("SELECT * FROM laboratoires");
    res.json(resultat.rows);
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des laboratoires" });
  }
});
// Données simulées pour les travaux pratiques —
// seront remplacées par de vraies requêtes PostgreSQL une fois la base connectée
// Route qui récupère les travaux pratiques depuis la vraie base PostgreSQL
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
// Route qui renvoie la liste des travaux pratiques
app.get("/api/travaux", (req, res) => {
  res.json(travaux);
});
// Route qui renvoie la liste des laboratoires au format JSON
app.get("/api/laboratoires", (req, res) => {
  res.json(laboratoires);
});
// Données simulées pour les soumissions —
// seront remplacées par de vraies requêtes PostgreSQL une fois la base connectée
// Route qui récupère les soumissions depuis PostgreSQL
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

// Route qui renvoie la liste des soumissions de l'étudiant
app.get("/api/soumissions", (req, res) => {
  res.json(soumissions);
});

// Donnée simulée pour le profil de l'étudiant —
// sera remplacée par les vraies infos de l'utilisateur connecté (authentification)
let etudiant = {
  nom: "Koffi",
  prenom: "Ama",
  email: "ama.koffi@etu.univ-kara.tg",
};

// Route qui récupère le profil de l'étudiant (id 1 pour l'instant,
// en attendant la vraie authentification qui identifiera l'utilisateur connecté)
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

// Route qui met à jour le profil dans la base de données
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

app.listen(5000, () => {
  console.log("Serveur lancé sur le port 5000");
});
