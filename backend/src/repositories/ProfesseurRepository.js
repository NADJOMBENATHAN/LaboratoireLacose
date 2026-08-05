const BaseRepository = require('./BaseRepository');
const Professeur = require('../entities/Professeur');

class ProfesseurRepository extends BaseRepository {
    constructor() {
        super('professeurs');
    }

    async findBySpecialite(specialite) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE specialite = $1`,
            [specialite]
        );
        return result.rows;
    }

    async findByDepartement(departement) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE departement = $1`,
            [departement]
        );
        return result.rows;
    }

    async findByGrade(grade) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE grade = $1`,
            [grade]
        );
        return result.rows;
    }

    mapRowToEntity(row) {
        return new Professeur(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            row.mot_de_passe,
            row.specialite,
            row.grade,
            row.departement,
            row.date_creation
        );
    }
}

module.exports = new ProfesseurRepository();
