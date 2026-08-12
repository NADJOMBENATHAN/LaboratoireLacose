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

    async findByEmail(email) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }

    async create(data) {
        const columns = ['nom', 'prenom', 'email', 'mot_de_passe', 'nom_entreprise', 'type_partenariat'];
        const values = columns.map(col => data[col]);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
        
        const query = `
            INSERT INTO ${this.tableName} (${columns.join(', ')})
            VALUES (${placeholders})
            RETURNING *
        `;
        
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async update(id, data) {
        const columns = ['nom', 'prenom', 'email', 'mot_de_passe', 'nom_entreprise', 'type_partenariat'];
        const values = [];
        const setClause = [];
        
        columns.forEach((col, index) => {
            if (data[col] !== undefined) {
                setClause.push(`${col} = $${index + 1}`);
                values.push(data[col]);
            }
        });
        
        if (setClause.length === 0) {
            return await this.findById(id);
        }
        
        const query = `
            UPDATE ${this.tableName}
            SET ${setClause.join(', ')}
            WHERE id = $${values.length + 1}
            RETURNING *
        `;
        
        values.push(id);
        const result = await this.pool.query(query, values);
        return result.rows[0];
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
