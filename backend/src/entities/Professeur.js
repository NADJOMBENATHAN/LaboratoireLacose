const Utilisateur = require('./Utilisateur');

class Professeur extends Utilisateur {
    constructor(id, nom, prenom, email, mot_de_passe, specialite, grade, departement, date_creation = null) {
        super(id, nom, prenom, email, mot_de_passe, 'professeur', date_creation);
        this.specialite = specialite;
        this.grade = grade;
        this.departement = departement;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            specialite: this.specialite,
            grade: this.grade,
            departement: this.departement
        };
    }
}

module.exports = Professeur;
