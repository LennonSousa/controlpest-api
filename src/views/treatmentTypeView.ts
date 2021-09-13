import TreatmentType from '../models/TreatmentTypesModel';
import serviceOrderView from './serviceOrderView';

export default {
    render(treatmentType: TreatmentType) {
        return {
            id: treatmentType.id,
            name: treatmentType.name,
            order: treatmentType.order,
            active: treatmentType.active,
            serviceOrders: treatmentType.serviceOrders ? serviceOrderView.renderMany(treatmentType.serviceOrders) : [],
        }
    },

    renderMany(treatmentTypes: TreatmentType[]) {
        return treatmentTypes.map(treatmentType => this.render(treatmentType));
    }
}