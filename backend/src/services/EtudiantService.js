const EtudiantRepository = require('../repositories/EtudiantRepository');

class EtudiantService {
    constructor() {
        this.etudiantRepository = EtudiantRepository;
    }

    async getAllEtudiants() {
        const etudiants = await this.etudiantRepository.findAllWithUsers();
        return etudiants.map(e => {
            delete e.mot_de_passe;
            return e;
        });
    }

    async getEtudiantById(id) {
        const etudiant = await this.etudiantRepository.findById(id);
        if (!etudiant) {
            throw new Error('Étudiant non trouvé');
        }
        delete etudiant.mot_de_passe;
        return etudiant;
    }

    async getEtudiantByNumero(numero) {
        const etudiant = await this.etudiantRepository.findByNumeroEtudiant(numero);
        if (!etudiant) {
            throw new Error('Étudiant non trouvé');
        }
        delete etudiant.mot_de_passe;
        return etudiant;
    }

    async getEtudiantsByFiliere(filiere) {
        const etudiants = await this.etudiantRepository.findByFiliere(filiere);
        return etudiants.map(e => {
            delete e.mot_de_passe;
            return e;
        });
    }

    async getEtudiantsByNiveau(niveau) {
        const etudiants = await this.etudiantRepository.findByNiveau(niveau);
        return etudiants.map(e => {
            delete e.mot_de_passe;
            return e;
        });
    }

    async createEtudiant(data) {
        const { email, numero_etudiant } = data;
        
        const existingEmail = await this.etudiantRepository.findByEmail(email);
        if (existingEmail) {
            throw new Error('Email déjà utilisé');
        }
        
        const existingNumero = await this.etudiantRepository.findByNumeroEtudiant(numero_etudiant);
        if (existingNumero) {
            throw new Error('Numéro étudiant déjà utilisé');
        }
        
        return await this.etudiantRepository.create(data);
    }

    async updateEtudiant(id, data) {
        const existing = await this.etudiantRepository.findById(id);
        if (!existing) {
            throw new Error('Étudiant non trouvé');
        }
        
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.etudiantRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email déjà utilisé');
            }
        }
        
        if (data.numero_etudiant && data.numero_etudiant !== existing.numero_etudiant) {
            const numeroExists = await this.etudiantRepository.findByNumeroEtudiant(data.numero_etudiant);
            if (numeroExists) {
                throw new Error('Numéro étudiant déjà utilisé');
            }
        }
        
        return await this.etudiantRepository.update(id, data);
    }

    async deleteEtudiant(id) {
        const existing = await this.etudiantRepository.findById(id);
        if (!existing) {
            throw new Error('Étudiant non trouvé');
        }
        return await this.etudiantRepository.delete(id);
    }
}

module.exports = new EtudiantService();
