const BaseRepository = require('./BaseRepository');
const Notification = require('../entities/Notification');

class NotificationRepository extends BaseRepository {
    constructor() {
        super('notifications');
    }

    async findByDestinataire(destinataireId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE destinataire_id = $1 ORDER BY date_creation DESC`,
            [destinataireId]
        );
        return result.rows;
    }

    async findNonLuesByDestinataire(destinataireId) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE destinataire_id = $1 AND lue = false ORDER BY date_creation DESC`,
            [destinataireId]
        );
        return result.rows;
    }

    async findByType(type) {
        const result = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE type = $1 ORDER BY date_creation DESC`,
            [type]
        );
        return result.rows;
    }

    async markAsLue(id) {
        const result = await this.pool.query(
            `UPDATE ${this.tableName} SET lue = true WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    }

    async markAllAsLues(destinataireId) {
        const result = await this.pool.query(
            `UPDATE ${this.tableName} SET lue = true WHERE destinataire_id = $1 RETURNING *`,
            [destinataireId]
        );
        return result.rows;
    }

    mapRowToEntity(row) {
        return new Notification(
            row.id,
            row.destinataire_id,
            row.type,
            row.message,
            row.date_creation,
            row.lue
        );
    }
}

module.exports = new NotificationRepository();
