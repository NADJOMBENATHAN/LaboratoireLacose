const pool = require('../../db');

class BaseRepository {
    constructor(tableName) {
        this.tableName = tableName;
        this.pool = pool;
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }

    async findById(id) {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async create(data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
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
        const columns = Object.keys(data);
        const values = Object.values(data);
        const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
        
        const query = `
            UPDATE ${this.tableName}
            SET ${setClause}
            WHERE id = $${values.length + 1}
            RETURNING *
        `;
        
        const result = await this.pool.query(query, [...values, id]);
        return result.rows[0];
    }

    async delete(id) {
        const result = await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`, [id]);
        return result.rows[0];
    }

    async count() {
        const result = await this.pool.query(`SELECT COUNT(*) FROM ${this.tableName}`);
        return parseInt(result.rows[0].count);
    }
}

module.exports = BaseRepository;
