const NotificationRepository = require('../repositories/NotificationRepository');
const UtilisateurRepository = require('../repositories/UtilisateurRepository');

class NotificationService {
    constructor() {
        this.notificationRepository = NotificationRepository;
        this.utilisateurRepository = UtilisateurRepository;
    }

    async getAllNotifications() {
        return await this.notificationRepository.findAll();
    }

    async getNotificationById(id) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new Error('Notification non trouvée');
        }
        return notification;
    }

    async getNotificationsByDestinataire(destinataireId) {
        const destinataire = await this.utilisateurRepository.findById(destinataireId);
        if (!destinataire) {
            throw new Error('Destinataire non trouvé');
        }
        return await this.notificationRepository.findByDestinataire(destinataireId);
    }

    async getNotificationsNonLues(destinataireId) {
        const destinataire = await this.utilisateurRepository.findById(destinataireId);
        if (!destinataire) {
            throw new Error('Destinataire non trouvé');
        }
        return await this.notificationRepository.findNonLuesByDestinataire(destinataireId);
    }

    async getNotificationsByType(type) {
        return await this.notificationRepository.findByType(type);
    }

    async createNotification(data) {
        const { destinataire_id } = data;
        
        const destinataire = await this.utilisateurRepository.findById(destinataire_id);
        if (!destinataire) {
            throw new Error('Destinataire non trouvé');
        }
        
        data.date_creation = new Date();
        data.lue = false;
        return await this.notificationRepository.create(data);
    }

    async markAsLue(id) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new Error('Notification non trouvée');
        }
        return await this.notificationRepository.markAsLue(id);
    }

    async markAllAsLues(destinataireId) {
        const destinataire = await this.utilisateurRepository.findById(destinataireId);
        if (!destinataire) {
            throw new Error('Destinataire non trouvé');
        }
        return await this.notificationRepository.markAllAsLues(destinataireId);
    }

    async deleteNotification(id) {
        const notification = await this.notificationRepository.findById(id);
        if (!notification) {
            throw new Error('Notification non trouvée');
        }
        return await this.notificationRepository.delete(id);
    }
}

module.exports = new NotificationService();
