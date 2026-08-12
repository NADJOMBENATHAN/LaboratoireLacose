const BaseRepository = require('./BaseRepository');
const Professeur = require('../entities/Professeur');

class ProfesseurRepository extends BaseRepository {
    constructor() {
        super('professeurs');
    }

    async findById(id) {
        const result = await this.pool.query(
            `SELECT u.*, p.specialite, p.departement, p.grade 
             FROM utilisateurs u 
             LEFT JOIN professeurs p ON u.id = p.id 
             WHERE u.id = $1 AND u.role = 'professeur'`,
            [id]
        );
        return result.rows[0];
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

    async findByEmail(email) {
        const result = await this.pool.query(
            `SELECT u.*, p.specialite, p.departement, p.grade 
             FROM utilisateurs u 
             LEFT JOIN professeurs p ON u.id = p.id 
             WHERE u.email = $1 AND u.role = 'professeur'`,
            [email]
        );
        return result.rows[0];
    }

    async findAllWithUsers() {
        const result = await this.pool.query(`
            SELECT u.*, p.specialite, p.departement, p.grade 
            FROM utilisateurs u 
            LEFT JOIN professeurs p ON u.id = p.id 
            WHERE u.role = 'professeur'
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
                 VALUES ($1, $2, $3, $4, 'professeur') 
                 RETURNING *`,
                [data.nom, data.prenom, data.email, data.mot_de_passe]
            );

            const userId = userResult.rows[0].id;

            // Insert into professeurs
            await client.query(
                `INSERT INTO professeurs (id, specialite, departement, grade) 
                 VALUES ($1, $2, $3, $4)`,
                [userId, data.specialite, data.departement, data.grade]
            );

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, p.specialite, p.departement, p.grade 
                FROM utilisateurs u 
                LEFT JOIN professeurs p ON u.id = p.id 
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

            // Update professeurs
            const profFields = ['specialite', 'departement', 'grade'];
            const profUpdates = [];
            const profValues = [];
            paramIndex = 1;

            profFields.forEach(field => {
                if (data[field] !== undefined) {
                    profUpdates.push(`${field} = $${paramIndex}`);
                    profValues.push(data[field]);
                    paramIndex++;
                }
            });

            if (profUpdates.length > 0) {
                profValues.push(id);
                await client.query(
                    `UPDATE professeurs SET ${profUpdates.join(', ')} WHERE id = $${paramIndex}`,
                    profValues
                );
            }

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, p.specialite, p.departement, p.grade 
                FROM utilisateurs u 
                LEFT JOIN professeurs p ON u.id = p.id 
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
            
            // Delete from professeurs (will cascade to utilisateurs due to FK)
            await client.query('DELETE FROM professeurs WHERE id = $1', [id]);
            
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
