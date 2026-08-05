const AdministrateurRepository = require('../repositories/AdministrateurRepository');
const UtilisateurRepository = require('../repositories/UtilisateurRepository');

class AdministrateurService {
    constructor() {
        this.administrateurRepository = AdministrateurRepository;
        this.utilisateurRepository = UtilisateurRepository;
    }

    async getAllAdministrateurs() {
        const administrateurs = await this.administrateurRepository.findAll();
        return administrateurs.map(a => {
            delete a.mot_de_passe;
            // Convert niveau_acces from integer to string
            a.niveau_acces = a.niveau_acces >= 3 ? 'super' : 'standard';
            return a;
        });
    }

    async getAdministrateurById(id) {
        const administrateur = await this.administrateurRepository.findById(id);
        if (!administrateur) {
            throw new Error('Administrateur non trouvé');
        }
        delete administrateur.mot_de_passe;
        // Convert niveau_acces from integer to string
        administrateur.niveau_acces = administrateur.niveau_acces >= 3 ? 'super' : 'standard';
        return administrateur;
    }

    async getAdministrateursByNiveau(niveau) {
        // Convert string niveau to integer for database query
        const niveauInt = niveau === 'super' ? 3 : 1;
        const administrateurs = await this.administrateurRepository.findByNiveauAcces(niveauInt);
        return administrateurs.map(a => {
            delete a.mot_de_passe;
            a.niveau_acces = niveau;
            return a;
        });
    }

    async createAdministrateur(data) {
        const { email } = data;
        const existing = await this.utilisateurRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email déjà utilisé');
        }
        const result = await this.administrateurRepository.create(data);
        delete result.mot_de_passe;
        result.niveau_acces = result.niveau_acces >= 3 ? 'super' : 'standard';
        return result;
    }

    async updateAdministrateur(id, data) {
        const existing = await this.administrateurRepository.findById(id);
        if (!existing) {
            throw new Error('Administrateur non trouvé');
        }
        
        if (data.email && data.email !== existing.email) {
            const emailExists = await this.utilisateurRepository.findByEmail(data.email);
            if (emailExists) {
                throw new Error('Email déjà utilisé');
            }
        }
        
        const result = await this.administrateurRepository.update(id, data);
        delete result.mot_de_passe;
        result.niveau_acces = result.niveau_acces >= 3 ? 'super' : 'standard';
        return result;
    }

    async deleteAdministrateur(id) {
        const existing = await this.administrateurRepository.findById(id);
        if (!existing) {
            throw new Error('Administrateur non trouvé');
        }
        return await this.administrateurRepository.delete(id);
    }
}

module.exports = new AdministrateurService();
