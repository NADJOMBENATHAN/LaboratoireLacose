const BaseRepository = require('./BaseRepository');
const Administrateur = require('../entities/Administrateur');

class AdministrateurRepository extends BaseRepository {
    constructor() {
        super('utilisateurs');
    }

    async findAll() {
        const result = await this.pool.query(`
            SELECT u.*, a.niveau_acces 
            FROM utilisateurs u 
            LEFT JOIN administrateurs a ON u.id = a.id 
            WHERE u.role = 'administrateur'
        `);
        return result.rows;
    }

    async findById(id) {
        const result = await this.pool.query(`
            SELECT u.*, a.niveau_acces 
            FROM utilisateurs u 
            LEFT JOIN administrateurs a ON u.id = a.id 
            WHERE u.id = $1 AND u.role = 'administrateur'
        `, [id]);
        return result.rows[0];
    }

    async findByNiveauAcces(niveau) {
        const result = await this.pool.query(`
            SELECT u.*, a.niveau_acces 
            FROM utilisateurs u 
            LEFT JOIN administrateurs a ON u.id = a.id 
            WHERE u.role = 'administrateur' AND a.niveau_acces = $1
        `, [niveau]);
        return result.rows;
    }

    async create(data) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            // Insert into utilisateurs
            const userResult = await client.query(
                `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
                 VALUES ($1, $2, $3, $4, 'administrateur') 
                 RETURNING *`,
                [data.nom, data.prenom, data.email, data.mot_de_passe]
            );

            const userId = userResult.rows[0].id;

            // Insert into administrateurs
            const niveau = data.niveau_acces === 'super' ? 3 : 1;
            await client.query(
                `INSERT INTO administrateurs (id, niveau_acces) VALUES ($1, $2)`,
                [userId, niveau]
            );

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, a.niveau_acces 
                FROM utilisateurs u 
                LEFT JOIN administrateurs a ON u.id = a.id 
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

            // Update administrateurs
            if (data.niveau_acces !== undefined) {
                const niveau = data.niveau_acces === 'super' ? 3 : 1;
                await client.query(
                    `UPDATE administrateurs SET niveau_acces = $1 WHERE id = $2`,
                    [niveau, id]
                );
            }

            await client.query('COMMIT');

            // Return joined data
            const result = await this.pool.query(`
                SELECT u.*, a.niveau_acces 
                FROM utilisateurs u 
                LEFT JOIN administrateurs a ON u.id = a.id 
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
            
            // Delete from administrateurs (will cascade to utilisateurs due to FK)
            await client.query('DELETE FROM administrateurs WHERE id = $1', [id]);
            
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
        const niveauLabel = row.niveau_acces >= 3 ? 'super' : 'standard';
        return new Administrateur(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            row.mot_de_passe,
            niveauLabel,
            row.date_creation
        );
    }
}

module.exports = new AdministrateurRepository();
