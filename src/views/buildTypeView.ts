import BuildType from '../models/BuildTypesModel';
import serviceOrderView from './serviceOrderView';

export default {
    render(buildType: BuildType) {
        return {
            id: buildType.id,
            name: buildType.name,
            order: buildType.order,
            active: buildType.active,
            serviceOrders: buildType.serviceOrders ? serviceOrderView.renderMany(buildType.serviceOrders) : [],
        }
    },

    renderMany(buildTypes: BuildType[]) {
        return buildTypes.map(buildType => this.render(buildType));
    }
}