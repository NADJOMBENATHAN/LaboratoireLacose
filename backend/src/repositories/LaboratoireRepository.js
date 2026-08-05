const BaseRepository = require('./BaseRepository');
const Laboratoire = require('../entities/Laboratoire');

class LaboratoireRepository extends BaseRepository {
    constructor() {
        super('laboratoires');
    }

    async findAllWithResponsable() {
        const result = await this.pool.query(`
            SELECT l.*, u.nom || ' ' || u.prenom as responsable_nom
            FROM laboratoires l
            LEFT JOIN utilisateurs u ON l.responsable_id = u.id
        `);
        return result.rows;
    }

    toEntity(row) {
        if (!row) return null;
        return new Laboratoire(
            row.id,
            row.nom,
            row.description,
            row.responsable_id,
            row.localisation,
            row.capacite,
            row.equipements
        );
    }
}

module.exports = LaboratoireRepository;
