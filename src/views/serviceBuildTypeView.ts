import ServiceBuildType from '../models/ServiceBuildTypesModel';
import serviceOrderView from './serviceOrderView';
import buildTypeView from './buildTypeView';

export default {
    render(serviceBuildType: ServiceBuildType) {
        return {
            id: serviceBuildType.id,
            service: serviceBuildType.service && serviceOrderView.render(serviceBuildType.service),
            build: serviceBuildType.build && buildTypeView.render(serviceBuildType.build),
        }
    },

    renderMany(serviceBuildTypes: ServiceBuildType[]) {
        return serviceBuildTypes.map(serviceBuildType => this.render(serviceBuildType));
    }
}