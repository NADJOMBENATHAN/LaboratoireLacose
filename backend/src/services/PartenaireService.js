const PartenaireRepository = require('../repositories/PartenaireRepository');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

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
        const { email, mot_de_passe } = data;
        const existing = await this.partenaireRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email déjà utilisé');
        }
        
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
        const dataWithHash = {
            ...data,
            mot_de_passe: hashedPassword
        };
        
        const result = await this.partenaireRepository.create(dataWithHash);
        delete result.mot_de_passe;
        return result;
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
        
        // Hasher le mot de passe si fourni
        let dataToUpdate = { ...data };
        if (data.mot_de_passe) {
            dataToUpdate.mot_de_passe = await bcrypt.hash(data.mot_de_passe, SALT_ROUNDS);
        }
        
        const result = await this.partenaireRepository.update(id, dataToUpdate);
        delete result.mot_de_passe;
        return result;
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
