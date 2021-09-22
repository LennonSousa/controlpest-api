import ServiceOrder from '../models/ServiceOrdersModel';
import customerView from './customerView';
import userView from './userView';
import itemView from './serviceItemView';
import serviceBuildTypeView from './serviceBuildTypeView';
import servicePragueTypeView from './servicePragueTypeView';
import serviceTreatmentTypeView from './serviceTreatmentTypeView';

export default {
    render(serviceOrder: ServiceOrder) {
        return {
            id: serviceOrder.id,
            other_prague_type: serviceOrder.other_prague_type,
            other_treatment_type: serviceOrder.other_treatment_type,
            build_description: serviceOrder.build_description,
            animals: serviceOrder.animals,
            old_people: serviceOrder.old_people,
            allergic_people: serviceOrder.allergic_people,
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
            items: serviceOrder.items ? itemView.renderMany(serviceOrder.items) : [],
            serviceBuildTypes: serviceOrder.serviceBuildTypes ? serviceBuildTypeView.renderMany(serviceOrder.serviceBuildTypes) : [],
            servicePragueTypes: serviceOrder.servicePragueTypes ? servicePragueTypeView.renderMany(serviceOrder.servicePragueTypes) : [],
            serviceTreatmentTypes: serviceOrder.serviceTreatmentTypes ? serviceTreatmentTypeView.renderMany(serviceOrder.serviceTreatmentTypes) : [],
        }
    },

    renderMany(serviceOrders: ServiceOrder[]) {
        return serviceOrders.map(serviceOrder => this.render(serviceOrder));
    }
}