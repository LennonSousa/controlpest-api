import ServicePragueType from '../models/ServicePragueTypesModel';
import serviceOrderView from './serviceOrderView';
import pragueTypeView from './pragueTypeView';

export default {
    render(servicePragueType: ServicePragueType) {
        return {
            id: servicePragueType.id,
            service: servicePragueType.service && serviceOrderView.render(servicePragueType.service),
            prague: servicePragueType.prague && pragueTypeView.render(servicePragueType.prague),
        }
    },

    renderMany(servicePragueTypes: ServicePragueType[]) {
        return servicePragueTypes.map(servicePragueType => this.render(servicePragueType));
    }
}