const express = require("express");
const cors = require("cors");

// Middleware
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const { authenticate, authorize } = require('./src/middleware/auth');
const {
    utilisateurValidation,
    etudiantValidation,
    professeurValidation,
    laboratoireValidation,
    travailPratiqueValidation,
    articleRechercheValidation,
    administrateurValidation,
    evaluationValidation,
    experienceValidation,
    notificationValidation,
    partenaireValidation,
    soumissionValidation,
    loginValidation
} = require('./src/middleware/validation');

// Controllers
const UtilisateurController = require('./src/controllers/UtilisateurController');
const LaboratoireController = require('./src/controllers/LaboratoireController');
const TravailPratiqueController = require('./src/controllers/TravailPratiqueController');
const ArticleRechercheController = require('./src/controllers/ArticleRechercheController');
const StatistiqueController = require('./src/controllers/StatistiqueController');
const AdministrateurController = require('./src/controllers/AdministrateurController');
const AuthController = require('./src/controllers/AuthController');
const EtudiantController = require('./src/controllers/EtudiantController');
const EvaluationController = require('./src/controllers/EvaluationController');
const ExperienceController = require('./src/controllers/ExperienceController');
const NotificationController = require('./src/controllers/NotificationController');
const PartenaireController = require('./src/controllers/PartenaireController');
const ProfesseurController = require('./src/controllers/ProfesseurController');
const SoumissionController = require('./src/controllers/SoumissionController');

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
const etudiantController = EtudiantController;
const evaluationController = new EvaluationController();
const experienceController = new ExperienceController();
const notificationController = new NotificationController();
const partenaireController = new PartenaireController();
const professeurController = new ProfesseurController();
const soumissionController = new SoumissionController();

// Route racine
app.get("/", (req, res) => {
    res.send("API LaCOSE fonctionne !");
});

// Routes Authentification
app.post("/api/login", loginValidation, (req, res) => AuthController.login(req, res));
app.post("/api/logout", (req, res) => AuthController.logout(req, res));

// Routes Utilisateurs (membres)
app.get("/api/membres", authenticate, (req, res) => utilisateurController.getAll(req, res));
app.get("/api/membres/:id", utilisateurValidation.id, authenticate, (req, res) => utilisateurController.getById(req, res));
app.post("/api/membres", utilisateurValidation.create, (req, res) => utilisateurController.create(req, res));
app.put("/api/membres/:id", utilisateurValidation.id, utilisateurValidation.update, authenticate, (req, res) => utilisateurController.update(req, res));
app.delete("/api/membres/:id", utilisateurValidation.id, authenticate, authorize('administrateur'), (req, res) => utilisateurController.delete(req, res));
app.get("/api/professeurs", (req, res) => utilisateurController.getProfesseurs(req, res));
app.get("/api/professeurs/specialite/:specialite", (req, res) => utilisateurController.getProfesseursBySpecialite(req, res));
app.get("/api/professeurs/departement/:departement", (req, res) => utilisateurController.getProfesseursByDepartement(req, res));
app.get("/api/etudiants", (req, res) => utilisateurController.getEtudiants(req, res));
app.get("/api/etudiants/filiere/:filiere", (req, res) => utilisateurController.getEtudiantsByFiliere(req, res));
app.get("/api/etudiants/niveau/:niveau", (req, res) => utilisateurController.getEtudiantsByNiveau(req, res));

// Routes Laboratoires
app.get("/api/laboratoires", (req, res) => laboratoireController.getAll(req, res));
app.get("/api/laboratoires/:id", laboratoireValidation.id, (req, res) => laboratoireController.getById(req, res));
app.post("/api/laboratoires", laboratoireValidation.create, authenticate, authorize('administrateur'), (req, res) => laboratoireController.create(req, res));
app.put("/api/laboratoires/:id", laboratoireValidation.id, laboratoireValidation.update, authenticate, authorize('administrateur'), (req, res) => laboratoireController.update(req, res));
app.delete("/api/laboratoires/:id", laboratoireValidation.id, authenticate, authorize('administrateur'), (req, res) => laboratoireController.delete(req, res));

// Routes Travaux Pratiques (projets)
app.get("/api/projets", (req, res) => travailPratiqueController.getAll(req, res));
app.get("/api/projets/:id", travailPratiqueValidation.id, (req, res) => travailPratiqueController.getById(req, res));
app.post("/api/projets", travailPratiqueValidation.create, authenticate, authorize('professeur', 'administrateur'), (req, res) => travailPratiqueController.create(req, res));
app.put("/api/projets/:id", travailPratiqueValidation.id, travailPratiqueValidation.update, authenticate, authorize('professeur', 'administrateur'), (req, res) => travailPratiqueController.update(req, res));
app.delete("/api/projets/:id", travailPratiqueValidation.id, authenticate, authorize('professeur', 'administrateur'), (req, res) => travailPratiqueController.delete(req, res));
app.get("/api/projets/statut/:statut", (req, res) => travailPratiqueController.getByStatut(req, res));
app.get("/api/projets/professeur/:professeurId", (req, res) => travailPratiqueController.getByProfesseur(req, res));

// Routes Articles Recherche (publications)
app.get("/api/publications", (req, res) => articleRechercheController.getAll(req, res));
app.get("/api/publications/:id", articleRechercheValidation.id, (req, res) => articleRechercheController.getById(req, res));
app.post("/api/publications", articleRechercheValidation.create, authenticate, (req, res) => articleRechercheController.create(req, res));
app.put("/api/publications/:id", articleRechercheValidation.id, articleRechercheValidation.update, authenticate, (req, res) => articleRechercheController.update(req, res));
app.delete("/api/publications/:id", articleRechercheValidation.id, authenticate, authorize('administrateur'), (req, res) => articleRechercheController.delete(req, res));
app.get("/api/publications/statut/:statut", (req, res) => articleRechercheController.getByStatut(req, res));
app.get("/api/publications/auteur/:auteurId", (req, res) => articleRechercheController.getByAuteur(req, res));
app.put("/api/publications/:id/publier", articleRechercheValidation.id, authenticate, authorize('administrateur'), (req, res) => articleRechercheController.publier(req, res));

// Route Statistiques
app.get("/api/stats", (req, res) => statistiqueController.getStatistiques(req, res));

// Routes Administrateurs
app.get("/api/administrateurs", authenticate, authorize('administrateur'), (req, res) => administrateurController.getAll(req, res));
app.get("/api/administrateurs/:id", administrateurValidation.id, authenticate, authorize('administrateur'), (req, res) => administrateurController.getById(req, res));
app.get("/api/administrateurs/niveau/:niveau", authenticate, authorize('administrateur'), (req, res) => administrateurController.getByNiveau(req, res));
app.post("/api/administrateurs", administrateurValidation.create, authenticate, authorize('super_admin'), (req, res) => administrateurController.create(req, res));
app.put("/api/administrateurs/:id", administrateurValidation.id, administrateurValidation.update, authenticate, authorize('super_admin'), (req, res) => administrateurController.update(req, res));
app.delete("/api/administrateurs/:id", administrateurValidation.id, authenticate, authorize('super_admin'), (req, res) => administrateurController.delete(req, res));

// Routes Étudiants
app.get("/api/etudiants-crud", authenticate, (req, res) => etudiantController.getAll(req, res));
app.get("/api/etudiants-crud/:id", etudiantValidation.id, authenticate, (req, res) => etudiantController.getById(req, res));
app.get("/api/etudiants-crud/numero/:numero", authenticate, (req, res) => etudiantController.getByNumero(req, res));
app.get("/api/etudiants-crud/filiere/:filiere", authenticate, (req, res) => etudiantController.getByFiliere(req, res));
app.get("/api/etudiants-crud/niveau/:niveau", authenticate, (req, res) => etudiantController.getByNiveau(req, res));
app.post("/api/etudiants-crud", etudiantValidation.create, authenticate, authorize('administrateur'), (req, res) => etudiantController.create(req, res));
app.put("/api/etudiants-crud/:id", etudiantValidation.id, etudiantValidation.update, authenticate, authorize('administrateur'), (req, res) => etudiantController.update(req, res));
app.delete("/api/etudiants-crud/:id", etudiantValidation.id, authenticate, authorize('administrateur'), (req, res) => etudiantController.delete(req, res));

// Routes Évaluations
app.get("/api/evaluations", authenticate, (req, res) => evaluationController.getAll(req, res));
app.get("/api/evaluations/:id", evaluationValidation.id, authenticate, (req, res) => evaluationController.getById(req, res));
app.get("/api/evaluations/soumission/:soumissionId", authenticate, (req, res) => evaluationController.getBySoumission(req, res));
app.get("/api/evaluations/professeur/:professeurId", authenticate, (req, res) => evaluationController.getByProfesseur(req, res));
app.post("/api/evaluations", evaluationValidation.create, authenticate, authorize('professeur', 'administrateur'), (req, res) => evaluationController.create(req, res));
app.put("/api/evaluations/:id", evaluationValidation.id, evaluationValidation.update, authenticate, authorize('professeur', 'administrateur'), (req, res) => evaluationController.update(req, res));
app.delete("/api/evaluations/:id", evaluationValidation.id, authenticate, authorize('administrateur'), (req, res) => evaluationController.delete(req, res));

// Routes Expériences
app.get("/api/experiences", (req, res) => experienceController.getAll(req, res));
app.get("/api/experiences/:id", experienceValidation.id, (req, res) => experienceController.getById(req, res));
app.get("/api/experiences/travail-pratique/:tpId", (req, res) => experienceController.getByTravailPratique(req, res));
app.get("/api/experiences/difficulte/:difficulte", (req, res) => experienceController.getByDifficulte(req, res));
app.post("/api/experiences", experienceValidation.create, authenticate, authorize('professeur', 'administrateur'), (req, res) => experienceController.create(req, res));
app.put("/api/experiences/:id", experienceValidation.id, experienceValidation.update, authenticate, authorize('professeur', 'administrateur'), (req, res) => experienceController.update(req, res));
app.delete("/api/experiences/:id", experienceValidation.id, authenticate, authorize('administrateur'), (req, res) => experienceController.delete(req, res));

// Routes Notifications
app.get("/api/notifications", authenticate, (req, res) => notificationController.getAll(req, res));
app.get("/api/notifications/:id", notificationValidation.id, authenticate, (req, res) => notificationController.getById(req, res));
app.get("/api/notifications/destinataire/:destinataireId", authenticate, (req, res) => notificationController.getByDestinataire(req, res));
app.get("/api/notifications/non-lues/:destinataireId", authenticate, (req, res) => notificationController.getNonLues(req, res));
app.get("/api/notifications/type/:type", authenticate, (req, res) => notificationController.getByType(req, res));
app.post("/api/notifications", notificationValidation.create, authenticate, (req, res) => notificationController.create(req, res));
app.put("/api/notifications/:id/lire", notificationValidation.id, authenticate, (req, res) => notificationController.markAsLue(req, res));
app.put("/api/notifications/destinataire/:destinataireId/lire-toutes", authenticate, (req, res) => notificationController.markAllAsLues(req, res));
app.delete("/api/notifications/:id", notificationValidation.id, authenticate, (req, res) => notificationController.delete(req, res));

// Routes Partenaires
app.get("/api/partenaires", (req, res) => partenaireController.getAll(req, res));
app.get("/api/partenaires/:id", partenaireValidation.id, (req, res) => partenaireController.getById(req, res));
app.get("/api/partenaires/entreprise/:entreprise", (req, res) => partenaireController.getByEntreprise(req, res));
app.get("/api/partenaires/type/:type", (req, res) => partenaireController.getByType(req, res));
app.post("/api/partenaires", partenaireValidation.create, authenticate, authorize('administrateur'), (req, res) => partenaireController.create(req, res));
app.put("/api/partenaires/:id", partenaireValidation.id, partenaireValidation.update, authenticate, authorize('administrateur'), (req, res) => partenaireController.update(req, res));
app.delete("/api/partenaires/:id", partenaireValidation.id, authenticate, authorize('administrateur'), (req, res) => partenaireController.delete(req, res));

// Routes Professeurs (CRUD)
app.get("/api/professeurs-crud", authenticate, (req, res) => professeurController.getAll(req, res));
app.get("/api/professeurs-crud/:id", authenticate, (req, res) => professeurController.getById(req, res));
app.get("/api/professeurs-crud/specialite/:specialite", authenticate, (req, res) => professeurController.getBySpecialite(req, res));
app.get("/api/professeurs-crud/departement/:departement", authenticate, (req, res) => professeurController.getByDepartement(req, res));
app.get("/api/professeurs-crud/grade/:grade", authenticate, (req, res) => professeurController.getByGrade(req, res));
app.post("/api/professeurs-crud", professeurValidation.create, authenticate, authorize('administrateur'), (req, res) => professeurController.create(req, res));
app.put("/api/professeurs-crud/:id", professeurValidation.id, professeurValidation.update, authenticate, authorize('administrateur'), (req, res) => professeurController.update(req, res));
app.delete("/api/professeurs-crud/:id", professeurValidation.id, authenticate, authorize('administrateur'), (req, res) => professeurController.delete(req, res));

// Routes Soumissions
app.get("/api/soumissions", authenticate, (req, res) => soumissionController.getAll(req, res));
app.get("/api/soumissions/:id", soumissionValidation.id, authenticate, (req, res) => soumissionController.getById(req, res));
app.get("/api/soumissions/etudiant/:etudiantId", authenticate, (req, res) => soumissionController.getByEtudiant(req, res));
app.get("/api/soumissions/travail-pratique/:tpId", authenticate, (req, res) => soumissionController.getByTravailPratique(req, res));
app.post("/api/soumissions", soumissionValidation.create, authenticate, (req, res) => soumissionController.create(req, res));
app.put("/api/soumissions/:id", soumissionValidation.id, soumissionValidation.update, authenticate, (req, res) => soumissionController.update(req, res));
app.delete("/api/soumissions/:id", soumissionValidation.id, authenticate, authorize('administrateur'), (req, res) => soumissionController.delete(req, res));

const PORT = process.env.PORT || 5000;

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Initialisation de la base de données au démarrage
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur LaCOSE lancé sur le port ${PORT}`);
    });
}).catch((error) => {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
});