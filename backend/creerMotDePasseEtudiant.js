const bcrypt = require("bcrypt");
const pool = require("./db");

async function creerMotDePasseEtudiant() {
  const motDePasseHache = await bcrypt.hash("etudiant123", 10);

  const resultat = await pool.query(
    "UPDATE etudiants SET mot_de_passe = $1 WHERE id = 1 RETURNING *",
    [motDePasseHache],
  );

  console.log("Mot de passe défini pour :", resultat.rows[0]);
  process.exit();
}

creerMotDePasseEtudiant();
