class Evaluation {
    constructor(id, soumission_id, professeur_id, note, feedback, date_evaluation) {
        this.id = id;
        this.soumission_id = soumission_id;
        this.professeur_id = professeur_id;
        this.note = note;
        this.feedback = feedback;
        this.date_evaluation = date_evaluation;
    }

    toJSON() {
        return {
            id: this.id,
            soumission_id: this.soumission_id,
            professeur_id: this.professeur_id,
            note: this.note,
            feedback: this.feedback,
            date_evaluation: this.date_evaluation
        };
    }
}

module.exports = Evaluation;
