class Experience {
    constructor(id, titre, description, travail_pratique_id, protocole, duree_estimee, difficulte) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.travail_pratique_id = travail_pratique_id;
        this.protocole = protocole;
        this.duree_estimee = duree_estimee;
        this.difficulte = difficulte;
    }

    toJSON() {
        return {
            id: this.id,
            titre: this.titre,
            description: this.description,
            travail_pratique_id: this.travail_pratique_id,
            protocole: this.protocole,
            duree_estimee: this.duree_estimee,
            difficulte: this.difficulte
        };
    }
}

module.exports = Experience;
