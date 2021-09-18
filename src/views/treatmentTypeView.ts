import TreatmentType from '../models/TreatmentTypesModel';

export default {
    render(treatmentType: TreatmentType) {
        return {
            id: treatmentType.id,
            name: treatmentType.name,
            order: treatmentType.order,
        }
    },

    renderMany(treatmentTypes: TreatmentType[]) {
        return treatmentTypes.map(treatmentType => this.render(treatmentType));
    }
}