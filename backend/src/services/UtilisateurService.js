const UtilisateurRepository = require('../repositories/UtilisateurRepository');

class UtilisateurService {
    constructor() {
        this.utilisateurRepository = new UtilisateurRepository();
    }

    async getAllUtilisateurs() {
        return await this.utilisateurRepository.findAllWithoutPassword();
    }

    async getUtilisateurById(id) {
        const utilisateur = await this.utilisateurRepository.findById(id);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }
        delete utilisateur.mot_de_passe;
        return utilisateur;
    }

    async createUtilisateur(data) {
        const { email } = data;
        const existing = await this.utilisateurRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email déjà utilisé');
        }
        return await this.utilisateurRepository.create(data);
    }

    async updateUtilisateur(id, data) {
        const existing = await this.utilisateurRepository.findById(id);
        if (!existing) {
            throw new Error('Utilisateur non trouvé');
        }
        
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.utilisateurRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email déjà utilisé');
            }
        }
        
        return await this.utilisateurRepository.update(id, data);
    }

    async deleteUtilisateur(id) {
        const existing = await this.utilisateurRepository.findById(id);
        if (!existing) {
            throw new Error('Utilisateur non trouvé');
        }
        return await this.utilisateurRepository.delete(id);
    }

    async getProfesseurs() {
        return await this.utilisateurRepository.findByRole('professeur');
    }

    async getEtudiants() {
        return await this.utilisateurRepository.findByRole('etudiant');
    }
}

module.exports = UtilisateurService;
