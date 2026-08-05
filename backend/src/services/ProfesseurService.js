const ProfesseurRepository = require('../repositories/ProfesseurRepository');

class ProfesseurService {
    constructor() {
        this.professeurRepository = ProfesseurRepository;
    }

    async getAllProfesseurs() {
        const professeurs = await this.professeurRepository.findAll();
        return professeurs.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async getProfesseurById(id) {
        const professeur = await this.professeurRepository.findById(id);
        if (!professeur) {
            throw new Error('Professeur non trouvé');
        }
        delete professeur.mot_de_passe;
        return professeur;
    }

    async getProfesseursBySpecialite(specialite) {
        const professeurs = await this.professeurRepository.findBySpecialite(specialite);
        return professeurs.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async getProfesseursByDepartement(departement) {
        const professeurs = await this.professeurRepository.findByDepartement(departement);
        return professeurs.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async getProfesseursByGrade(grade) {
        const professeurs = await this.professeurRepository.findByGrade(grade);
        return professeurs.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async createProfesseur(data) {
        const { email } = data;
        const existing = await this.professeurRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email déjà utilisé');
        }
        return await this.professeurRepository.create(data);
    }

    async updateProfesseur(id, data) {
        const existing = await this.professeurRepository.findById(id);
        if (!existing) {
            throw new Error('Professeur non trouvé');
        }
        
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.professeurRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email déjà utilisé');
            }
        }
        
        return await this.professeurRepository.update(id, data);
    }

    async deleteProfesseur(id) {
        const existing = await this.professeurRepository.findById(id);
        if (!existing) {
            throw new Error('Professeur non trouvé');
        }
        return await this.professeurRepository.delete(id);
    }
}

module.exports = new ProfesseurService();
