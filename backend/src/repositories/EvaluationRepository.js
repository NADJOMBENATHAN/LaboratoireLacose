const BaseRepository = require('./BaseRepository');
const Evaluation = require('../entities/Evaluation');

class EvaluationRepository extends BaseRepository {
    constructor() {
        super('evaluations');
    }

    async findBySoumission(soumissionId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE soumission_id = $1`,
            [soumissionId]
        );
        return result.rows;
    }

    async findByProfesseur(professeurId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE professeur_id = $1`,
            [professeurId]
        );
        return result.rows;
    }

    async findBySoumissionAndProfesseur(soumissionId, professeurId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE soumission_id = $1 AND professeur_id = $2`,
            [soumissionId, professeurId]
        );
        return result.rows[0];
    }

    mapRowToEntity(row) {
        return new Evaluation(
            row.id,
            row.soumission_id,
            row.professeur_id,
            row.note,
            row.feedback,
            row.date_evaluation
        );
    }
}

module.exports = new EvaluationRepository();
