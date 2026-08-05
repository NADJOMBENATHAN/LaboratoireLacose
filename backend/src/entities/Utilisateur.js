class Utilisateur {
    constructor(id, nom, prenom, email, mot_de_passe, role, date_creation = null) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mot_de_passe = mot_de_passe;
        this.role = role;
        this.date_creation = date_creation;
    }

    get nomComplet() {
        return `${this.prenom} ${this.nom}`;
    }

    toJSON() {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            role: this.role,
            date_creation: this.date_creation
        };
    }
}

module.exports = Utilisateur;
