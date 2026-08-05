const LaboratoireRepository = require('../repositories/LaboratoireRepository');

class LaboratoireService {
    constructor() {
        this.laboratoireRepository = new LaboratoireRepository();
    }

    async getAllLaboratoires() {
        return await this.laboratoireRepository.findAllWithResponsable();
    }

    async getLaboratoireById(id) {
        const laboratoire = await this.laboratoireRepository.findById(id);
        if (!laboratoire) {
            throw new Error('Laboratoire non trouvé');
        }
        return laboratoire;
    }

    async createLaboratoire(data) {
        return await this.laboratoireRepository.create(data);
    }

    async updateLaboratoire(id, data) {
        const existing = await this.laboratoireRepository.findById(id);
        if (!existing) {
            throw new Error('Laboratoire non trouvé');
        }
        return await this.laboratoireRepository.update(id, data);
    }

    async deleteLaboratoire(id) {
        const existing = await this.laboratoireRepository.findById(id);
        if (!existing) {
            throw new Error('Laboratoire non trouvé');
        }
        return await this.laboratoireRepository.delete(id);
    }
}

module.exports = LaboratoireService;
