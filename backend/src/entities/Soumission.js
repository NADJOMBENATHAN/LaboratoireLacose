class Soumission {
    constructor(id, etudiant_id, travail_pratique_id, date_soumission, fichier, note, commentaire) {
        this.id = id;
        this.etudiant_id = etudiant_id;
        this.travail_pratique_id = travail_pratique_id;
        this.date_soumission = date_soumission;
        this.fichier = fichier;
        this.note = note;
        this.commentaire = commentaire;
    }

    toJSON() {
        return {
            id: this.id,
            etudiant_id: this.etudiant_id,
            travail_pratique_id: this.travail_pratique_id,
            date_soumission: this.date_soumission,
            fichier: this.fichier,
            note: this.note,
            commentaire: this.commentaire
        };
    }
}

module.exports = Soumission;
