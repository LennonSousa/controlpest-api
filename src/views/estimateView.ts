import Estimate from '../models/EstimatesModel';
import customerView from './customerView';
import userView from './userView';
import statusView from './estimateStatusView';
import itemView from './estimateItemView';

export default {
    render(estimate: Estimate) {
        return {
            id: estimate.id,
            same_address: estimate.same_address,
            zip_code: estimate.zip_code,
            street: estimate.street,
            number: estimate.number,
            neighborhood: estimate.neighborhood,
            complement: estimate.complement,
            city: estimate.city,
            state: estimate.state,
            discount_percent: estimate.discount_percent,
            discount: estimate.discount,
            increase_percent: estimate.increase_percent,
            increase: estimate.increase,
            payment: estimate.payment,
            created_at: estimate.created_at,
            created_by: estimate.created_by,
            expire_at: estimate.expire_at,
            finish_at: estimate.finish_at,
            notes: estimate.notes,
            customer: estimate.customer && customerView.render(estimate.customer),
            user: estimate.user && userView.render(estimate.user),
            status: estimate.status && statusView.render(estimate.status),
            items: estimate.items ? itemView.renderMany(estimate.items) : [],
        }
    },

    renderMany(estimates: Estimate[]) {
        return estimates.map(estimate => this.render(estimate));
    }
}