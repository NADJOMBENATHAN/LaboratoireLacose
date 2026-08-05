const UtilisateurRepository = require('../repositories/UtilisateurRepository');
const TravailPratiqueRepository = require('../repositories/TravailPratiqueRepository');
const ArticleRechercheRepository = require('../repositories/ArticleRechercheRepository');
const LaboratoireRepository = require('../repositories/LaboratoireRepository');

class StatistiqueService {
    constructor() {
        this.utilisateurRepository = new UtilisateurRepository();
        this.travailPratiqueRepository = new TravailPratiqueRepository();
        this.articleRechercheRepository = new ArticleRechercheRepository();
        this.laboratoireRepository = new LaboratoireRepository();
    }

    async getStatistiques() {
        const [utilisateurs, travauxPratiques, articles, laboratoires] = await Promise.all([
            this.utilisateurRepository.count(),
            this.travailPratiqueRepository.count(),
            this.articleRechercheRepository.count(),
            this.laboratoireRepository.count()
        ]);

        return {
            membres: utilisateurs,
            projets: travauxPratiques,
            publications: articles,
            laboratoires: laboratoires,
            analyses: 156
        };
    }
}

module.exports = StatistiqueService;
