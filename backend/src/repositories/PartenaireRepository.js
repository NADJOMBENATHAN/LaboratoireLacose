const BaseRepository = require('./BaseRepository');
const Partenaire = require('../entities/Partenaire');

class PartenaireRepository extends BaseRepository {
    constructor() {
        super('partenaires');
    }

    async findByEntreprise(nomEntreprise) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE nom_entreprise = $1`,
            [nomEntreprise]
        );
        return result.rows;
    }

    async findByTypePartenariat(type) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE type_partenariat = $1`,
            [type]
        );
        return result.rows;
    }

    mapRowToEntity(row) {
        return new Partenaire(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            row.mot_de_passe,
            row.nom_entreprise,
            row.type_partenariat,
            row.date_creation
        );
    }
}

module.exports = new PartenaireRepository();
