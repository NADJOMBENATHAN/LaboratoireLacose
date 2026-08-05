const Utilisateur = require('./Utilisateur');

class Partenaire extends Utilisateur {
    constructor(id, nom, prenom, email, mot_de_passe, nom_entreprise, type_partenariat, date_creation = null) {
        super(id, nom, prenom, email, mot_de_passe, 'partenaire', date_creation);
        this.nom_entreprise = nom_entreprise;
        this.type_partenariat = type_partenariat;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            nom_entreprise: this.nom_entreprise,
            type_partenariat: this.type_partenariat
        };
    }
}

module.exports = Partenaire;
