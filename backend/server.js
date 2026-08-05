const express = require("express");
const cors = require("cors");

// Controllers
const UtilisateurController = require('./src/controllers/UtilisateurController');
const LaboratoireController = require('./src/controllers/LaboratoireController');
const TravailPratiqueController = require('./src/controllers/TravailPratiqueController');
const ArticleRechercheController = require('./src/controllers/ArticleRechercheController');
const StatistiqueController = require('./src/controllers/StatistiqueController');
const AdministrateurController = require('./src/controllers/AdministrateurController');

// Database initialization
const initDatabase = require('./src/config/initDatabase');

const app = express();

app.use(cors());
app.use(express.json());

// Initialisation des controllers
const utilisateurController = new UtilisateurController();
const laboratoireController = new LaboratoireController();
const travailPratiqueController = new TravailPratiqueController();
const articleRechercheController = new ArticleRechercheController();
const statistiqueController = new StatistiqueController();
const administrateurController = AdministrateurController;

// Route racine
app.get("/", (req, res) => {
    res.send("API LaCOSE fonctionne !");
});

// Routes Utilisateurs (membres)
app.get("/api/membres", (req, res) => utilisateurController.getAll(req, res));
app.get("/api/membres/:id", (req, res) => utilisateurController.getById(req, res));
app.post("/api/membres", (req, res) => utilisateurController.create(req, res));
app.put("/api/membres/:id", (req, res) => utilisateurController.update(req, res));
app.delete("/api/membres/:id", (req, res) => utilisateurController.delete(req, res));
app.get("/api/professeurs", (req, res) => utilisateurController.getProfesseurs(req, res));
app.get("/api/etudiants", (req, res) => utilisateurController.getEtudiants(req, res));

// Routes Laboratoires
app.get("/api/laboratoires", (req, res) => laboratoireController.getAll(req, res));
app.get("/api/laboratoires/:id", (req, res) => laboratoireController.getById(req, res));
app.post("/api/laboratoires", (req, res) => laboratoireController.create(req, res));
app.put("/api/laboratoires/:id", (req, res) => laboratoireController.update(req, res));
app.delete("/api/laboratoires/:id", (req, res) => laboratoireController.delete(req, res));

// Routes Travaux Pratiques (projets)
app.get("/api/projets", (req, res) => travailPratiqueController.getAll(req, res));
app.get("/api/projets/:id", (req, res) => travailPratiqueController.getById(req, res));
app.post("/api/projets", (req, res) => travailPratiqueController.create(req, res));
app.put("/api/projets/:id", (req, res) => travailPratiqueController.update(req, res));
app.delete("/api/projets/:id", (req, res) => travailPratiqueController.delete(req, res));
app.get("/api/projets/statut/:statut", (req, res) => travailPratiqueController.getByStatut(req, res));
app.get("/api/projets/professeur/:professeurId", (req, res) => travailPratiqueController.getByProfesseur(req, res));

// Routes Articles Recherche (publications)
app.get("/api/publications", (req, res) => articleRechercheController.getAll(req, res));
app.get("/api/publications/:id", (req, res) => articleRechercheController.getById(req, res));
app.post("/api/publications", (req, res) => articleRechercheController.create(req, res));
app.put("/api/publications/:id", (req, res) => articleRechercheController.update(req, res));
app.delete("/api/publications/:id", (req, res) => articleRechercheController.delete(req, res));
app.get("/api/publications/statut/:statut", (req, res) => articleRechercheController.getByStatut(req, res));
app.get("/api/publications/auteur/:auteurId", (req, res) => articleRechercheController.getByAuteur(req, res));
app.put("/api/publications/:id/publier", (req, res) => articleRechercheController.publier(req, res));

// Route Statistiques
app.get("/api/stats", (req, res) => statistiqueController.getStatistiques(req, res));

// Routes Administrateurs
app.get("/api/administrateurs", (req, res) => administrateurController.getAll(req, res));
app.get("/api/administrateurs/:id", (req, res) => administrateurController.getById(req, res));
app.get("/api/administrateurs/niveau/:niveau", (req, res) => administrateurController.getByNiveau(req, res));
app.post("/api/administrateurs", (req, res) => administrateurController.create(req, res));
app.put("/api/administrateurs/:id", (req, res) => administrateurController.update(req, res));
app.delete("/api/administrateurs/:id", (req, res) => administrateurController.delete(req, res));

const PORT = process.env.PORT || 5000;

// Initialisation de la base de données au démarrage
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur LaCOSE lancé sur le port ${PORT}`);
    });
}).catch((error) => {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
});