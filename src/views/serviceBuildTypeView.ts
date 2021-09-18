import ServiceBuildType from '../models/ServiceBuildTypesModel';
import serviceOrderView from './serviceOrderView';
import buildTypeView from './buildTypeView';

export default {
    render(estimateItem: ServiceBuildType) {
        return {
            id: estimateItem.id,
            service: estimateItem.service && serviceOrderView.render(estimateItem.service),
            build: estimateItem.build && buildTypeView.render(estimateItem.build),
        }
    },

    renderMany(estimateItems: ServiceBuildType[]) {
        return estimateItems.map(estimateItem => this.render(estimateItem));
    }
}