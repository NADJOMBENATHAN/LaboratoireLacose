const UtilisateurRepository = require('../repositories/UtilisateurRepository');
const EtudiantRepository = require('../repositories/EtudiantRepository');
const ProfesseurRepository = require('../repositories/ProfesseurRepository');
const PartenaireRepository = require('../repositories/PartenaireRepository');
const TravailPratiqueRepository = require('../repositories/TravailPratiqueRepository');
const ArticleRechercheRepository = require('../repositories/ArticleRechercheRepository');
const LaboratoireRepository = require('../repositories/LaboratoireRepository');

class StatistiqueService {
    constructor() {
        this.utilisateurRepository = UtilisateurRepository;
        this.etudiantRepository = EtudiantRepository;
        this.professeurRepository = ProfesseurRepository;
        this.partenaireRepository = PartenaireRepository;
        this.travailPratiqueRepository = TravailPratiqueRepository;
        this.articleRechercheRepository = ArticleRechercheRepository;
        this.laboratoireRepository = LaboratoireRepository;
    }

    async getStatistiques() {
        const [utilisateurs, etudiants, professeurs, partenaires, travauxPratiques, articles, laboratoires] = await Promise.all([
            this.utilisateurRepository.count(),
            this.etudiantRepository.count(),
            this.professeurRepository.count(),
            this.partenaireRepository.count(),
            this.travailPratiqueRepository.count(),
            this.articleRechercheRepository.count(),
            this.laboratoireRepository.count()
        ]);

        return {
            membres: utilisateurs,
            etudiants: etudiants,
            professeurs: professeurs,
            partenaires: partenaires,
            projets: travauxPratiques,
            publications: articles,
            laboratoires: laboratoires,
            analyses: 156
        };
    }
}

module.exports = StatistiqueService;
