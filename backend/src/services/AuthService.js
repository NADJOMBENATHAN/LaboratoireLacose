const UtilisateurRepository = require('../repositories/UtilisateurRepository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');

const SALT_ROUNDS = 10;

/**
 * Classe AuthService
 * Service pour la gestion de l'authentification
 * Encapsule la logique métier pour les opérations d'authentification
 */
class AuthService {
    constructor() {
        this.utilisateurRepository = new UtilisateurRepository();
    }

    /**
     * Hash un mot de passe
     * @param {string} password - Mot de passe en clair
     * @returns {Promise<string>} Mot de passe hashé
     */
    async hashPassword(password) {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    /**
     * Compare un mot de passe avec son hash
     * @param {string} password - Mot de passe en clair
     * @param {string} hash - Hash du mot de passe
     * @returns {Promise<boolean>} True si le mot de passe correspond
     */
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Méthode login
     * Authentifie un utilisateur avec email et mot de passe
     * @param {string} email - Email de l'utilisateur
     * @param {string} password - Mot de passe de l'utilisateur
     * @returns {Promise<Object>} Utilisateur authentifié avec token JWT
     * @throws {Error} Si l'email ou le mot de passe est incorrect
     */
    async login(email, password) {
        const utilisateur = await this.utilisateurRepository.findByEmail(email);
        
        if (!utilisateur) {
            throw new Error('Email ou mot de passe incorrect');
        }

        // Vérification du mot de passe avec bcrypt
        const isPasswordValid = await this.comparePassword(password, utilisateur.mot_de_passe);
        
        if (!isPasswordValid) {
            throw new Error('Email ou mot de passe incorrect');
        }

        // Supprimer le mot de passe avant de retourner l'utilisateur
        delete utilisateur.mot_de_passe;
        
        // Générer le token JWT
        const token = generateToken({
            id: utilisateur.id,
            email: utilisateur.email,
            role: utilisateur.role
        });

        return {
            utilisateur,
            token
        };
    }

    /**
     * Méthode register
     * Enregistre un nouvel utilisateur avec mot de passe hashé
     * @param {Object} userData - Données de l'utilisateur
     * @returns {Promise<Object>} Utilisateur créé sans mot de passe
     */
    async register(userData) {
        // Hasher le mot de passe
        const hashedPassword = await this.hashPassword(userData.mot_de_passe);
        
        // Remplacer le mot de passe en clair par le hash
        const userDataWithHash = {
            ...userData,
            mot_de_passe: hashedPassword
        };

        const utilisateur = await this.utilisateurRepository.create(userDataWithHash);
        
        // Supprimer le mot de passe avant de retourner l'utilisateur
        delete utilisateur.mot_de_passe;
        
        return utilisateur;
    }
}

module.exports = new AuthService();
