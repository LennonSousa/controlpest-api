import ServiceItem from '../models/ServiceItemsModel';

export default {
    render(serviceItem: ServiceItem) {
        return {
            id: serviceItem.id,
            name: serviceItem.name,
            details: serviceItem.details,
            amount: serviceItem.amount,
            order: serviceItem.order,
        }
    },

    renderMany(serviceItems: ServiceItem[]) {
        const serviceItemsSorted = serviceItems.sort((a, b) => a.order - b.order);

        return serviceItemsSorted.map(serviceItem => this.render(serviceItem));
    }
}