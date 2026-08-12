const AuthService = require('../services/AuthService');
const { UnauthorizedError } = require('../middleware/errorHandler');

/**
 * Classe AuthController
 * Contrôleur pour la gestion des requêtes HTTP liées à l'authentification
 * Gère les routes de login et logout
 */
class AuthController {
    constructor() {
        this.authService = AuthService;
    }

    /**
     * Méthode login
     * Authentifie un utilisateur
     * @param {Object} req - Requête HTTP avec email et password dans le corps
     * @param {Object} res - Réponse HTTP
     */
    async login(req, res) {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new UnauthorizedError('Email et mot de passe requis');
        }

        const result = await this.authService.login(email, password);
        res.json(result);
    }

    /**
     * Méthode logout
     * Déconnecte un utilisateur
     * @param {Object} req - Requête HTTP
     * @param {Object} res - Réponse HTTP
     */
    logout(req, res) {
        res.json({ message: 'Déconnexion réussie' });
    }
}

module.exports = new AuthController();
