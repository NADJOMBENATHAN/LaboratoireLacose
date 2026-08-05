class TravailPratique {
    constructor(id, titre, description, laboratoire_id, professeur_id, date_debut, date_fin, statut) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.laboratoire_id = laboratoire_id;
        this.professeur_id = professeur_id;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.statut = statut || 'planifie';
    }

    toJSON() {
        return {
            id: this.id,
            titre: this.titre,
            description: this.description,
            laboratoire_id: this.laboratoire_id,
            professeur_id: this.professeur_id,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
            statut: this.statut
        };
    }
}

module.exports = TravailPratique;
