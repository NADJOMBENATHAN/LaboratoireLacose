const StatistiqueService = require('../services/StatistiqueService');

class StatistiqueController {
    constructor() {
        this.statistiqueService = new StatistiqueService();
    }

    async getStatistiques(req, res) {
        try {
            const stats = await this.statistiqueService.getStatistiques();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = StatistiqueController;
