import PragueType from '../models/PragueTypesModel';
import serviceOrderView from './serviceOrderView';

export default {
    render(pragueType: PragueType) {
        return {
            id: pragueType.id,
            name: pragueType.name,
            order: pragueType.order,
            active: pragueType.active,
            serviceOrders: pragueType.serviceOrders ? serviceOrderView.renderMany(pragueType.serviceOrders) : [],
        }
    },

    renderMany(pragueTypes: PragueType[]) {
        return pragueTypes.map(pragueType => this.render(pragueType));
    }
}