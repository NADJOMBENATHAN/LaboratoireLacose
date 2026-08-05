class ArticleRecherche {
    constructor(id, titre, resume, contenu, auteur_id, date_publication, statut) {
        this.id = id;
        this.titre = titre;
        this.resume = resume;
        this.contenu = contenu;
        this.auteur_id = auteur_id;
        this.date_publication = date_publication;
        this.statut = statut || 'brouillon';
    }

    toJSON() {
        return {
            id: this.id,
            titre: this.titre,
            resume: this.resume,
            contenu: this.contenu,
            auteur_id: this.auteur_id,
            date_publication: this.date_publication,
            statut: this.statut
        };
    }
}

module.exports = ArticleRecherche;
