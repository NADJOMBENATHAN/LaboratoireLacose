const BaseRepository = require('./BaseRepository');
const Experience = require('../entities/Experience');

class ExperienceRepository extends BaseRepository {
    constructor() {
        super('experiences');
    }

    async findByTravailPratique(travailPratiqueId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE travail_pratique_id = $1`,
            [travailPratiqueId]
        );
        return result.rows;
    }

    async findByDifficulte(difficulte) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE difficulte = $1`,
            [difficulte]
        );
        return result.rows;
    }

    mapRowToEntity(row) {
        return new Experience(
            row.id,
            row.titre,
            row.description,
            row.travail_pratique_id,
            row.protocole,
            row.duree_estimee,
            row.difficulte
        );
    }
}

module.exports = new ExperienceRepository();
