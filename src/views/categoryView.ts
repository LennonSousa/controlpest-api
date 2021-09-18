import Category from '../models/CategoriesModel';
import productView from './productView';

export default {
    render(category: Category) {
        return {
            id: category.id,
            title: category.title,
            paused: category.paused,
            order: category.order,
            created_at: category.created_at,
            products: category.products ? productView.renderMany(category.products) : [],
        }
    },

    renderMany(categories: Category[]) {
        const categoriesSorted = categories.sort((a, b) => a.order - b.order);

        return categoriesSorted.map(category => this.render(category));
    }
}