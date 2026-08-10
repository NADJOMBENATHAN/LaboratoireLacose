const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Node.js fonctionne !");
});

// Données simulées côté backend pour l'instant —
// seront remplacées par de vraies requêtes PostgreSQL une fois la base connectée
const laboratoires = [
  {
    id: 1,
    nom: "Laboratoire de Chimie Organique", // <- modifié ici
    description: "Étude des composés organiques et de leurs réactions.",
    domaine: "Chimie organique",
  },
  {
    id: 2,
    nom: "Laboratoire des Substances Naturelles",
    description: "Extraction et analyse de substances issues de plantes.",
    domaine: "Chimie naturelle",
  },
];
// Données simulées pour les travaux pratiques —
// seront remplacées par de vraies requêtes PostgreSQL une fois la base connectée
const travaux = [
  {
    id: 1,
    titre: "Dosage acido-basique",
    description:
      "Réaliser un dosage pour déterminer la concentration d'une solution acide.",
    dateLimite: "15/09/2026",
  },
  {
    id: 2,
    titre: "Mesure du pH",
    description:
      "Mesurer le pH de différentes solutions et interpréter les résultats.",
    dateLimite: "22/09/2026",
  },
  {
    id: 3,
    titre: "Préparation d'une solution",
    description:
      "Préparer une solution à une concentration donnée par dilution.",
    dateLimite: "29/09/2026",
  },
];

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
const soumissions = [
  {
    id: 1,
    titre: "Dosage acido-basique",
    dateSoumission: "05/08/2026",
    statut: "En attente",
  },
];

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

// Route qui renvoie le profil actuel
app.get("/api/profil", (req, res) => {
  res.json(etudiant);
});

// Route qui met à jour le profil avec les nouvelles valeurs envoyées par le formulaire
app.put("/api/profil", (req, res) => {
  etudiant = { ...etudiant, ...req.body };
  res.json(etudiant);
});

app.listen(5000, () => {
  console.log("Serveur lancé sur le port 5000");
});
