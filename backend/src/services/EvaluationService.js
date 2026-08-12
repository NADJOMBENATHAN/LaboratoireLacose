const EvaluationRepository = require('../repositories/EvaluationRepository');
const SoumissionRepository = require('../repositories/SoumissionRepository');
const ProfesseurRepository = require('../repositories/ProfesseurRepository');

class EvaluationService {
    constructor() {
        this.evaluationRepository = EvaluationRepository;
        this.soumissionRepository = SoumissionRepository;
        this.professeurRepository = ProfesseurRepository;
    }

    async getAllEvaluations() {
        return await this.evaluationRepository.findAll();
    }

    async getEvaluationById(id) {
        const evaluation = await this.evaluationRepository.findById(id);
        if (!evaluation) {
            throw new Error('Évaluation non trouvée');
        }
        return evaluation;
    }

    async getEvaluationsBySoumission(soumissionId) {
        const soumission = await this.soumissionRepository.findById(soumissionId);
        if (!soumission) {
            throw new Error('Soumission non trouvée');
        }
        return await this.evaluationRepository.findBySoumission(soumissionId);
    }

    async getEvaluationsByProfesseur(professeurId) {
        const professeur = await this.professeurRepository.findById(professeurId);
        if (!professeur) {
            throw new Error('Professeur non trouvé');
        }
        return await this.evaluationRepository.findByProfesseur(professeurId);
    }

    async createEvaluation(data) {
        const { soumission_id, professeur_id, note } = data;
        
        console.log('Création évaluation - Données:', { soumission_id, professeur_id, note });
        
        const soumission = await this.soumissionRepository.findById(soumission_id);
        if (!soumission) {
            console.error('Soumission non trouvée:', soumission_id);
            throw new Error('Soumission non trouvée');
        }
        
        const professeur = await this.professeurRepository.findById(professeur_id);
        if (!professeur) {
            console.error('Professeur non trouvé:', professeur_id);
            throw new Error('Professeur non trouvé');
        }
        
        if (note < 0 || note > 20) {
            console.error('Note invalide:', note);
            throw new Error('La note doit être entre 0 et 20');
        }
        
        const existing = await this.evaluationRepository.findBySoumissionAndProfesseur(soumission_id, professeur_id);
        if (existing) {
            console.error('Évaluation déjà existante pour soumission:', soumission_id, 'professeur:', professeur_id);
            throw new Error('Évaluation déjà existante pour cette soumission');
        }
        
        data.date_evaluation = new Date();
        console.log('Création évaluation - Données finales:', data);
        
        try {
            const result = await this.evaluationRepository.create(data);
            console.log('Évaluation créée avec succès:', result);
            return result;
        } catch (error) {
            console.error('Erreur lors de la création de l\'évaluation:', error);
            throw error;
        }
    }

    async updateEvaluation(id, data) {
        const existing = await this.evaluationRepository.findById(id);
        if (!existing) {
            throw new Error('Évaluation non trouvée');
        }
        
        if (data.note !== undefined && (data.note < 0 || data.note > 20)) {
            throw new Error('La note doit être entre 0 et 20');
        }
        
        return await this.evaluationRepository.update(id, data);
    }

    async deleteEvaluation(id) {
        const existing = await this.evaluationRepository.findById(id);
        if (!existing) {
            throw new Error('Évaluation non trouvée');
        }
        return await this.evaluationRepository.delete(id);
    }
}

module.exports = new EvaluationService();
