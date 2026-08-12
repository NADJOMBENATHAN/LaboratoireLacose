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

    async findByEmail(email) {
        const result = await this.pool.query(
            `SELECT u.*, e.numero_etudiant, e.niveau_etude, e.filiere 
             FROM utilisateurs u 
             LEFT JOIN etudiants e ON u.id = e.id 
             WHERE u.email = $1 AND u.role = 'etudiant'`,
            [email]
        );
        return result.rows[0];
    }

    async findAllWithUsers() {
        const result = await this.pool.query(`
            SELECT u.*, e.numero_etudiant, e.niveau_etude, e.filiere 
            FROM utilisateurs u 
            LEFT JOIN etudiants e ON u.id = e.id 
            WHERE u.role = 'etudiant'
        `);
        return result.rows;
    }

    async create(data) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            // Insert into utilisateurs
            const userResult = await client.query(
                `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
                 VALUES ($1, $2, $3, $4, 'etudiant') 
                 RETURNING *`,
                [data.nom, data.prenom, data.email, data.mot_de_passe]
            );

            const userId = userResult.rows[0].id;

            // Insert into etudiants
            await client.query(
                `INSERT INTO etudiants (id, numero_etudiant, niveau_etude, filiere) 
                 VALUES ($1, $2, $3, $4)`,
                [userId, data.numero_etudiant, data.niveau_etude, data.filiere]
            );

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, e.numero_etudiant, e.niveau_etude, e.filiere 
                FROM utilisateurs u 
                LEFT JOIN etudiants e ON u.id = e.id 
                WHERE u.id = $1
            `, [userId]);
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async update(id, data) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            // Update utilisateurs
            const userFields = ['nom', 'prenom', 'email'];
            const userUpdates = [];
            const userValues = [];
            let paramIndex = 1;

            userFields.forEach(field => {
                if (data[field] !== undefined) {
                    userUpdates.push(`${field} = $${paramIndex}`);
                    userValues.push(data[field]);
                    paramIndex++;
                }
            });

            if (data.mot_de_passe) {
                userUpdates.push(`mot_de_passe = $${paramIndex}`);
                userValues.push(data.mot_de_passe);
                paramIndex++;
            }

            if (userUpdates.length > 0) {
                userValues.push(id);
                await client.query(
                    `UPDATE utilisateurs SET ${userUpdates.join(', ')} WHERE id = $${paramIndex}`,
                    userValues
                );
            }

            // Update etudiants
            const etudFields = ['numero_etudiant', 'niveau_etude', 'filiere'];
            const etudUpdates = [];
            const etudValues = [];
            paramIndex = 1;

            etudFields.forEach(field => {
                if (data[field] !== undefined) {
                    etudUpdates.push(`${field} = $${paramIndex}`);
                    etudValues.push(data[field]);
                    paramIndex++;
                }
            });

            if (etudUpdates.length > 0) {
                etudValues.push(id);
                await client.query(
                    `UPDATE etudiants SET ${etudUpdates.join(', ')} WHERE id = $${paramIndex}`,
                    etudValues
                );
            }

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, e.numero_etudiant, e.niveau_etude, e.filiere 
                FROM utilisateurs u 
                LEFT JOIN etudiants e ON u.id = e.id 
                WHERE u.id = $1
            `, [id]);
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async delete(id) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            
            // Delete from etudiants (will cascade to utilisateurs due to FK)
            await client.query('DELETE FROM etudiants WHERE id = $1', [id]);
            
            await client.query('COMMIT');
            return { id };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
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
