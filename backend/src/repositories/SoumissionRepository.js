const BaseRepository = require('./BaseRepository');
const Soumission = require('../entities/Soumission');

class SoumissionRepository extends BaseRepository {
    constructor() {
        super('soumissions');
    }

    async findByEtudiant(etudiantId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE etudiant_id = $1`,
            [etudiantId]
        );
        return result.rows;
    }

    async findByTravailPratique(travailPratiqueId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE travail_pratique_id = $1`,
            [travailPratiqueId]
        );
        return result.rows;
    }

    async findByEtudiantAndTP(etudiantId, travailPratiqueId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE etudiant_id = $1 AND travail_pratique_id = $2`,
            [etudiantId, travailPratiqueId]
        );
        return result.rows[0];
    }

    mapRowToEntity(row) {
        return new Soumission(
            row.id,
            row.etudiant_id,
            row.travail_pratique_id,
            row.date_soumission,
            row.fichier,
            row.note,
            row.commentaire
        );
    }
}

module.exports = new SoumissionRepository();
