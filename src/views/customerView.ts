import Customer from '../models/CustomersModel';
import customerTypeView from './customerTypeView';
import estimateView from './estimateView';
import serviceOrderView from './serviceOrderView';

export default {
    render(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            document: customer.document,
            phone: customer.phone,
            cellphone: customer.cellphone,
            contacts: customer.contacts,
            email: customer.email,
            zip_code: customer.zip_code,
            street: customer.street,
            number: customer.number,
            neighborhood: customer.neighborhood,
            complement: customer.complement,
            city: customer.city,
            state: customer.state,
            owner: customer.owner,
            notes: customer.notes,
            birth: customer.birth,
            created_by: customer.created_by,
            created_at: customer.created_at,
            type: customer.type && customerTypeView.render(customer.type),
            estimates: customer.estimates ? estimateView.renderMany(customer.estimates) : [],
            serviceOrders: customer.serviceOrders ? serviceOrderView.renderMany(customer.serviceOrders) : [],
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer));
    }
}