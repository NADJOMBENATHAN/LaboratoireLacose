const ArticleRechercheService = require('../services/ArticleRechercheService');
const { NotFoundError } = require('../middleware/errorHandler');

class ArticleRechercheController {
    constructor() {
        this.articleRechercheService = new ArticleRechercheService();
    }

    async getAll(req, res) {
        const articles = await this.articleRechercheService.getAllArticles();
        res.json(articles);
    }

    async getById(req, res) {
        const article = await this.articleRechercheService.getArticleById(req.params.id);
        if (!article) {
            throw new NotFoundError('Article non trouvé');
        }
        res.json(article);
    }

    async create(req, res) {
        const article = await this.articleRechercheService.createArticle(req.body);
        res.status(201).json(article);
    }

    async update(req, res) {
        const article = await this.articleRechercheService.updateArticle(req.params.id, req.body);
        if (!article) {
            throw new NotFoundError('Article non trouvé');
        }
        res.json(article);
    }

    async delete(req, res) {
        const result = await this.articleRechercheService.deleteArticle(req.params.id);
        if (!result) {
            throw new NotFoundError('Article non trouvé');
        }
        res.json({ message: 'Article supprimé' });
    }

    async getByStatut(req, res) {
        const articles = await this.articleRechercheService.getArticlesByStatut(req.params.statut);
        res.json(articles);
    }

    async getByAuteur(req, res) {
        const articles = await this.articleRechercheService.getArticlesByAuteur(req.params.auteurId);
        res.json(articles);
    }

    async publier(req, res) {
        const article = await this.articleRechercheService.publierArticle(req.params.id);
        if (!article) {
            throw new NotFoundError('Article non trouvé');
        }
        res.json(article);
    }
}

module.exports = ArticleRechercheController;
