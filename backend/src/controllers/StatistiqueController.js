const StatistiqueService = require('../services/StatistiqueService');

class StatistiqueController {
    constructor() {
        this.statistiqueService = new StatistiqueService();
    }

    async getStatistiques(req, res) {
        const stats = await this.statistiqueService.getStatistiques();
        res.json(stats);
    }
}

module.exports = StatistiqueController;
