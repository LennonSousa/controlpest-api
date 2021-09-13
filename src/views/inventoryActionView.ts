import InventoryAction from '../models/InventoryActionsModel';
import productView from './productView';
import userView from './userView'

export default {
    render(inventoryAction: InventoryAction) {
        return {
            id: inventoryAction.id,
            type: inventoryAction.type,
            description: inventoryAction.description,
            price: inventoryAction.price,
            amount: inventoryAction.amount,
            inventory_amount: inventoryAction.inventory_amount,
            created_at: inventoryAction.created_at,
            product: inventoryAction.product && productView.render(inventoryAction.product),
            user: inventoryAction.user && userView.render(inventoryAction.user),
        }
    },

    renderMany(inventoryActions: InventoryAction[]) {
        return inventoryActions.map(inventoryAction => this.render(inventoryAction));
    }
}