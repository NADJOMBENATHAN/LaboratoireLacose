const ArticleRechercheRepository = require('../repositories/ArticleRechercheRepository');

class ArticleRechercheService {
    constructor() {
        this.articleRechercheRepository = new ArticleRechercheRepository();
    }

    async getAllArticles() {
        return await this.articleRechercheRepository.findAllWithAuteur();
    }

    async getArticleById(id) {
        const article = await this.articleRechercheRepository.findById(id);
        if (!article) {
            throw new Error('Article non trouvé');
        }
        return article;
    }

    async createArticle(data) {
        return await this.articleRechercheRepository.create(data);
    }

    async updateArticle(id, data) {
        const existing = await this.articleRechercheRepository.findById(id);
        if (!existing) {
            throw new Error('Article non trouvé');
        }
        return await this.articleRechercheRepository.update(id, data);
    }

    async deleteArticle(id) {
        const existing = await this.articleRechercheRepository.findById(id);
        if (!existing) {
            throw new Error('Article non trouvé');
        }
        return await this.articleRechercheRepository.delete(id);
    }

    async getArticlesByStatut(statut) {
        return await this.articleRechercheRepository.findByStatut(statut);
    }

    async getArticlesByAuteur(auteurId) {
        return await this.articleRechercheRepository.findByAuteur(auteurId);
    }

    async publierArticle(id) {
        return await this.articleRechercheRepository.update(id, { statut: 'publie' });
    }
}

module.exports = ArticleRechercheService;
