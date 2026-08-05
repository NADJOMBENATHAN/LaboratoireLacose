const PartenaireRepository = require('../repositories/PartenaireRepository');

class PartenaireService {
    constructor() {
        this.partenaireRepository = PartenaireRepository;
    }

    async getAllPartenaires() {
        const partenaires = await this.partenaireRepository.findAll();
        return partenaires.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async getPartenaireById(id) {
        const partenaire = await this.partenaireRepository.findById(id);
        if (!partenaire) {
            throw new Error('Partenaire non trouvé');
        }
        delete partenaire.mot_de_passe;
        return partenaire;
    }

    async getPartenairesByEntreprise(nomEntreprise) {
        const partenaires = await this.partenaireRepository.findByEntreprise(nomEntreprise);
        return partenaires.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async getPartenairesByType(type) {
        const partenaires = await this.partenaireRepository.findByTypePartenariat(type);
        return partenaires.map(p => {
            delete p.mot_de_passe;
            return p;
        });
    }

    async createPartenaire(data) {
        const { email } = data;
        const existing = await this.partenaireRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email déjà utilisé');
        }
        return await this.partenaireRepository.create(data);
    }

    async updatePartenaire(id, data) {
        const existing = await this.partenaireRepository.findById(id);
        if (!existing) {
            throw new Error('Partenaire non trouvé');
        }
        
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.partenaireRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email déjà utilisé');
            }
        }
        
        return await this.partenaireRepository.update(id, data);
    }

    async deletePartenaire(id) {
        const existing = await this.partenaireRepository.findById(id);
        if (!existing) {
            throw new Error('Partenaire non trouvé');
        }
        return await this.partenaireRepository.delete(id);
    }
}

module.exports = new PartenaireService();
