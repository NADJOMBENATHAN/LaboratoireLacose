class Notification {
    constructor(id, destinataire_id, type, message, date_creation, lue = false) {
        this.id = id;
        this.destinataire_id = destinataire_id;
        this.type = type;
        this.message = message;
        this.date_creation = date_creation;
        this.lue = lue;
    }

    toJSON() {
        return {
            id: this.id,
            destinataire_id: this.destinataire_id,
            type: this.type,
            message: this.message,
            date_creation: this.date_creation,
            lue: this.lue
        };
    }
}

module.exports = Notification;
