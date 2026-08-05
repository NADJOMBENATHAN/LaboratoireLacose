const BaseRepository = require('./BaseRepository');
const Utilisateur = require('../entities/Utilisateur');

class UtilisateurRepository extends BaseRepository {
    constructor() {
        super('utilisateurs');
    }

    async findByEmail(email) {
        const result = await this.pool.query(
            'SELECT * FROM utilisateurs WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    async findByRole(role) {
        const result = await this.pool.query(
            'SELECT * FROM utilisateurs WHERE role = $1',
            [role]
        );
        return result.rows;
    }

    async findAllWithoutPassword() {
        const result = await this.pool.query(
            'SELECT id, nom, prenom, email, role, date_creation FROM utilisateurs'
        );
        return result.rows.map(row => new Utilisateur(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            null,
            row.role,
            row.date_creation
        ));
    }

    toEntity(row) {
        if (!row) return null;
        return new Utilisateur(
            row.id,
            row.nom,
            row.prenom,
            row.email,
            row.mot_de_passe,
            row.role,
            row.date_creation
        );
    }
}

module.exports = UtilisateurRepository;
