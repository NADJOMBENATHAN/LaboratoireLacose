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

    async findEtudiantsByFiliere(filiere) {
        const result = await this.pool.query(
            'SELECT u.id, u.nom, u.prenom, u.email, u.role, u.date_creation FROM utilisateurs u JOIN etudiants e ON u.id = e.id WHERE e.filiere = $1',
            [filiere]
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

    async findEtudiantsByNiveau(niveau) {
        const result = await this.pool.query(
            'SELECT u.id, u.nom, u.prenom, u.email, u.role, u.date_creation FROM utilisateurs u JOIN etudiants e ON u.id = e.id WHERE e.niveau_etude = $1',
            [niveau]
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

    async findProfesseursBySpecialite(specialite) {
        const result = await this.pool.query(
            'SELECT u.id, u.nom, u.prenom, u.email, u.role, u.date_creation FROM utilisateurs u JOIN professeurs p ON u.id = p.id WHERE p.specialite = $1',
            [specialite]
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

    async findProfesseursByDepartement(departement) {
        const result = await this.pool.query(
            'SELECT u.id, u.nom, u.prenom, u.email, u.role, u.date_creation FROM utilisateurs u JOIN professeurs p ON u.id = p.id WHERE p.departement = $1',
            [departement]
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
