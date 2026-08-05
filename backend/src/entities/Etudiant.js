const Utilisateur = require('./Utilisateur');

class Etudiant extends Utilisateur {
    constructor(id, nom, prenom, email, mot_de_passe, numero_etudiant, niveau_etude, filiere, date_creation = null) {
        super(id, nom, prenom, email, mot_de_passe, 'etudiant', date_creation);
        this.numero_etudiant = numero_etudiant;
        this.niveau_etude = niveau_etude;
        this.filiere = filiere;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            numero_etudiant: this.numero_etudiant,
            niveau_etude: this.niveau_etude,
            filiere: this.filiere
        };
    }
}

module.exports = Etudiant;
