const BaseRepository = require('./BaseRepository');
const ArticleRecherche = require('../entities/ArticleRecherche');

class ArticleRechercheRepository extends BaseRepository {
    constructor() {
        super('articles_recherche');
    }

    async findAllWithAuteur() {
        const result = await this.pool.query(`
            SELECT ar.*, u.nom || ' ' || u.prenom as auteur_nom
            FROM articles_recherche ar
            LEFT JOIN utilisateurs u ON ar.auteur_id = u.id
        `);
        return result.rows;
    }

    async findByStatut(statut) {
        const result = await this.pool.query(
            'SELECT * FROM articles_recherche WHERE statut = $1',
            [statut]
        );
        return result.rows;
    }

    async findByAuteur(auteurId) {
        const result = await this.pool.query(
            'SELECT * FROM articles_recherche WHERE auteur_id = $1',
            [auteurId]
        );
        return result.rows;
    }

    toEntity(row) {
        if (!row) return null;
        return new ArticleRecherche(
            row.id,
            row.titre,
            row.resume,
            row.contenu,
            row.auteur_id,
            row.date_publication,
            row.statut
        );
    }
}

module.exports = ArticleRechercheRepository;
