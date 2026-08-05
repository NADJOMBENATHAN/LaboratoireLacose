const Utilisateur = require('./Utilisateur');

class Administrateur extends Utilisateur {
    constructor(id, nom, prenom, email, mot_de_passe, niveau_acces, date_creation = null) {
        super(id, nom, prenom, email, mot_de_passe, 'administrateur', date_creation);
        this.niveau_acces = niveau_acces;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            niveau_acces: this.niveau_acces
        };
    }
}

module.exports = Administrateur;
