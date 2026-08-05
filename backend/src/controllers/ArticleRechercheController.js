const ArticleRechercheService = require('../services/ArticleRechercheService');

class ArticleRechercheController {
    constructor() {
        this.articleRechercheService = new ArticleRechercheService();
    }

    async getAll(req, res) {
        try {
            const articles = await this.articleRechercheService.getAllArticles();
            res.json(articles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const article = await this.articleRechercheService.getArticleById(req.params.id);
            res.json(article);
        } catch (error) {
            if (error.message === 'Article non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const article = await this.articleRechercheService.createArticle(req.body);
            res.status(201).json(article);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const article = await this.articleRechercheService.updateArticle(req.params.id, req.body);
            res.json(article);
        } catch (error) {
            if (error.message === 'Article non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.articleRechercheService.deleteArticle(req.params.id);
            res.json({ message: 'Article supprimé' });
        } catch (error) {
            if (error.message === 'Article non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByStatut(req, res) {
        try {
            const articles = await this.articleRechercheService.getArticlesByStatut(req.params.statut);
            res.json(articles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByAuteur(req, res) {
        try {
            const articles = await this.articleRechercheService.getArticlesByAuteur(req.params.auteurId);
            res.json(articles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async publier(req, res) {
        try {
            const article = await this.articleRechercheService.publierArticle(req.params.id);
            res.json(article);
        } catch (error) {
            if (error.message === 'Article non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = ArticleRechercheController;
