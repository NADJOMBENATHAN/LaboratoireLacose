const BaseRepository = require('./BaseRepository');
const Etudiant = require('../entities/Etudiant');

class EtudiantRepository extends BaseRepository {
    constructor() {
        super('etudiants');
    }

    async findByNumeroEtudiant(numero) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE numero_etudiant = $1`,
            [numero]
        );
        return result.rows[0];
    }

    async findByFiliere(filiere) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE filiere = $1`,
            [filiere]
        );
        return result.rows;
    }

    async findByNiveau(niveau) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE niveau_etude = $1`,
            [niveau]
        );
        return result.rows;
    }

    mapRowToEntity(row) {
        return new Etudiant(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            row.mot_de_passe,
            row.numero_etudiant,
            row.niveau_etude,
            row.filiere,
            row.date_creation
        );
    }
}

module.exports = new EtudiantRepository();
