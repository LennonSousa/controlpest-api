import ServiceOrder from '../models/ServiceOrdersModel';
import customerView from './customerView';
import userView from './userView';
import pragueTypeView from './pragueTypeView';
import treatmentTypeView from './treatmentTypeView';
import buildTypeView from './buildTypeView';

export default {
    render(serviceOrder: ServiceOrder) {
        return {
            id: serviceOrder.id,
            other_prague_type: serviceOrder.other_prague_type,
            other_treatment_type: serviceOrder.other_treatment_type,
            other_build_type: serviceOrder.other_build_type,
            build_description: serviceOrder.build_description,
            value: serviceOrder.value,
            payment: serviceOrder.payment,
            warranty: serviceOrder.warranty,
            notes: serviceOrder.notes,
            created_at: serviceOrder.created_at,
            created_by: serviceOrder.created_by,
            start_at: serviceOrder.start_at,
            updated_by: serviceOrder.updated_by,
            updated_at: serviceOrder.updated_at,
            customer: serviceOrder.customer && customerView.render(serviceOrder.customer),
            user: serviceOrder.user && userView.render(serviceOrder.user),
            pragueType: serviceOrder.pragueType && pragueTypeView.render(serviceOrder.pragueType),
            treatmentType: serviceOrder.treatmentType && treatmentTypeView.render(serviceOrder.treatmentType),
            buildType: serviceOrder.buildType && buildTypeView.render(serviceOrder.buildType),
        }
    },

    renderMany(serviceOrders: ServiceOrder[]) {
        return serviceOrders.map(serviceOrder => this.render(serviceOrder));
    }
}