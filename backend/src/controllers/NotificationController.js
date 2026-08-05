const NotificationService = require('../services/NotificationService');

class NotificationController {
    constructor() {
        this.notificationService = NotificationService;
    }

    async getAll(req, res) {
        try {
            const notifications = await this.notificationService.getAllNotifications();
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const notification = await this.notificationService.getNotificationById(req.params.id);
            res.json(notification);
        } catch (error) {
            if (error.message === 'Notification non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByDestinataire(req, res) {
        try {
            const notifications = await this.notificationService.getNotificationsByDestinataire(req.params.destinataireId);
            res.json(notifications);
        } catch (error) {
            if (error.message === 'Destinataire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getNonLues(req, res) {
        try {
            const notifications = await this.notificationService.getNotificationsNonLues(req.params.destinataireId);
            res.json(notifications);
        } catch (error) {
            if (error.message === 'Destinataire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByType(req, res) {
        try {
            const notifications = await this.notificationService.getNotificationsByType(req.params.type);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const notification = await this.notificationService.createNotification(req.body);
            res.status(201).json(notification);
        } catch (error) {
            if (error.message === 'Destinataire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async markAsLue(req, res) {
        try {
            const notification = await this.notificationService.markAsLue(req.params.id);
            res.json(notification);
        } catch (error) {
            if (error.message === 'Notification non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async markAllAsLues(req, res) {
        try {
            const notifications = await this.notificationService.markAllAsLues(req.params.destinataireId);
            res.json(notifications);
        } catch (error) {
            if (error.message === 'Destinataire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.notificationService.deleteNotification(req.params.id);
            res.json({ message: 'Notification supprimée' });
        } catch (error) {
            if (error.message === 'Notification non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = NotificationController;
