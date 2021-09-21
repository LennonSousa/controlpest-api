import Service from '../models/ServicesModel';

export default {
    render(service: Service) {
        return {
            id: service.id,
            name: service.name,
            price: service.price,
            order: service.order,
        }
    },

    renderMany(services: Service[]) {
        const servicesSorted = services.sort((a, b) => a.order - b.order);

        return servicesSorted.map(service => this.render(service));
    }
}