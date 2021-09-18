import Product from '../models/ProductsModel';
import categoryView from './categoryView';
import inventoryActionView from './inventoryActionView'

export default {
    render(product: Product) {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            discount: product.discount,
            discount_price: product.discount_price,
            inventory_amount: product.inventory_amount,
            inventory_min: product.inventory_min,
            paused: product.paused,
            order: product.order,
            created_at: product.created_at,
            category: product.category && categoryView.render(product.category),
            inventory_actions: product.inventory_actions ? inventoryActionView.renderMany(product.inventory_actions) : [],
        }
    },

    renderMany(products: Product[]) {
        return products.map(product => this.render(product));
    }
}