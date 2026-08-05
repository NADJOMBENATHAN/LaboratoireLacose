class Laboratoire {
    constructor(id, nom, description, responsable_id, localisation, capacite, equipements) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.responsable_id = responsable_id;
        this.localisation = localisation;
        this.capacite = capacite;
        this.equipements = equipements;
    }

    toJSON() {
        return {
            id: this.id,
            nom: this.nom,
            description: this.description,
            responsable_id: this.responsable_id,
            localisation: this.localisation,
            capacite: this.capacite,
            equipements: this.equipements
        };
    }
}

module.exports = Laboratoire;
