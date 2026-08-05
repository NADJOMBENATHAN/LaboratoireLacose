const BaseRepository = require('./BaseRepository');
const TravailPratique = require('../entities/TravailPratique');

class TravailPratiqueRepository extends BaseRepository {
    constructor() {
        super('travaux_pratiques');
    }

    async findAllWithDetails() {
        const result = await this.pool.query(`
            SELECT tp.*, 
                   l.nom as laboratoire_nom,
                   u.nom || ' ' || u.prenom as professeur_nom
            FROM travaux_pratiques tp
            LEFT JOIN laboratoires l ON tp.laboratoire_id = l.id
            LEFT JOIN utilisateurs u ON tp.professeur_id = u.id
        `);
        return result.rows;
    }

    async findByStatut(statut) {
        const result = await this.pool.query(
            'SELECT * FROM travaux_pratiques WHERE statut = $1',
            [statut]
        );
        return result.rows;
    }

    async findByProfesseur(professeurId) {
        const result = await this.pool.query(
            'SELECT * FROM travaux_pratiques WHERE professeur_id = $1',
            [professeurId]
        );
        return result.rows;
    }

    toEntity(row) {
        if (!row) return null;
        return new TravailPratique(
            row.id,
            row.titre,
            row.description,
            row.laboratoire_id,
            row.professeur_id,
            row.date_debut,
            row.date_fin,
            row.statut
        );
    }
}

module.exports = TravailPratiqueRepository;
