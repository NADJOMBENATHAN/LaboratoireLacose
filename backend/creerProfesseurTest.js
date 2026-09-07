const bcrypt = require("bcrypt");
const pool = require("./db");

async function creerProfesseurTest() {
  const motDePasseHache = await bcrypt.hash("motdepasse123", 10);

  const resultat = await pool.query(
    `INSERT INTO professeurs (nom, prenom, email, mot_de_passe, grade, departement)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      "SALIFOU",
      "Docteur",
      "salifou@ucyd.tg",
      motDePasseHache,
      "Maître de conférences",
      "Chimie",
    ],
  );

  console.log("Professeur créé :", resultat.rows[0]);
  process.exit();
}

creerProfesseurTest();
