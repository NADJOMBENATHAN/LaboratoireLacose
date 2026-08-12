const NotificationService = require('../services/NotificationService');
const { NotFoundError } = require('../middleware/errorHandler');

/**
 * Classe NotificationController
 * Contrôleur pour la gestion des requêtes HTTP liées aux notifications
 * Gère les routes CRUD et les réponses HTTP appropriées
 */
class NotificationController {
    constructor() {
        this.notificationService = NotificationService;
    }

    /**
     * Méthode getAll
     * Récupère toutes les notifications
     * @param {Object} req - Requête HTTP
     * @param {Object} res - Réponse HTTP
     */
    async getAll(req, res) {
        const notifications = await this.notificationService.getAllNotifications();
        res.json(notifications);
    }

    /**
     * Méthode getById
     * Récupère une notification par son ID
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async getById(req, res) {
        const notification = await this.notificationService.getNotificationById(req.params.id);
        if (!notification) {
            throw new NotFoundError('Notification non trouvée');
        }
        res.json(notification);
    }

    /**
     * Méthode getByDestinataire
     * Récupère les notifications par destinataire
     * @param {Object} req - Requête HTTP avec paramètre destinataireId
     * @param {Object} res - Réponse HTTP
     */
    async getByDestinataire(req, res) {
        const notifications = await this.notificationService.getNotificationsByDestinataire(req.params.destinataireId);
        res.json(notifications);
    }

    /**
     * Méthode getNonLues
     * Récupère les notifications non lues par destinataire
     * @param {Object} req - Requête HTTP avec paramètre destinataireId
     * @param {Object} res - Réponse HTTP
     */
    async getNonLues(req, res) {
        const notifications = await this.notificationService.getNotificationsNonLues(req.params.destinataireId);
        res.json(notifications);
    }

    /**
     * Méthode getByType
     * Récupère les notifications par type
     * @param {Object} req - Requête HTTP avec paramètre type
     * @param {Object} res - Réponse HTTP
     */
    async getByType(req, res) {
        const notifications = await this.notificationService.getNotificationsByType(req.params.type);
        res.json(notifications);
    }

    /**
     * Méthode create
     * Crée une nouvelle notification
     * @param {Object} req - Requête HTTP avec corps de données
     * @param {Object} res - Réponse HTTP
     */
    async create(req, res) {
        const notification = await this.notificationService.createNotification(req.body);
        res.status(201).json(notification);
    }

    /**
     * Méthode markAsLue
     * Marque une notification comme lue
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async markAsLue(req, res) {
        const notification = await this.notificationService.markAsLue(req.params.id);
        if (!notification) {
            throw new NotFoundError('Notification non trouvée');
        }
        res.json(notification);
    }

    /**
     * Méthode markAllAsLues
     * Marque toutes les notifications d'un destinataire comme lues
     * @param {Object} req - Requête HTTP avec paramètre destinataireId
     * @param {Object} res - Réponse HTTP
     */
    async markAllAsLues(req, res) {
        const notifications = await this.notificationService.markAllAsLues(req.params.destinataireId);
        res.json(notifications);
    }

    /**
     * Méthode delete
     * Supprime une notification
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async delete(req, res) {
        const result = await this.notificationService.deleteNotification(req.params.id);
        if (!result) {
            throw new NotFoundError('Notification non trouvée');
        }
        res.json({ message: 'Notification supprimée' });
    }
}

module.exports = NotificationController;
