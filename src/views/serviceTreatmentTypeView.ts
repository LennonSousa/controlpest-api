import ServiceTreatmentType from '../models/ServiceTreatmentTypesModel';
import serviceOrderView from './serviceOrderView';
import treatmentTypeView from './treatmentTypeView';

export default {
    render(serviceTreatmentType: ServiceTreatmentType) {
        return {
            id: serviceTreatmentType.id,
            service: serviceTreatmentType.service && serviceOrderView.render(serviceTreatmentType.service),
            treatment: serviceTreatmentType.treatment && treatmentTypeView.render(serviceTreatmentType.treatment),
        }
    },

    renderMany(serviceTreatmentTypes: ServiceTreatmentType[]) {
        return serviceTreatmentTypes.map(serviceTreatmentType => this.render(serviceTreatmentType));
    }
}