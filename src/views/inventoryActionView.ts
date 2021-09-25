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
            created_by: inventoryAction.created_by,
            product: inventoryAction.product && productView.render(inventoryAction.product),
        }
    },

    renderMany(inventoryActions: InventoryAction[]) {
        const inventoryActionsSorted = inventoryActions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

        return inventoryActionsSorted.map(inventoryAction => this.render(inventoryAction));
    }
}