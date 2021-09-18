import PragueType from '../models/PragueTypesModel';

export default {
    render(pragueType: PragueType) {
        return {
            id: pragueType.id,
            name: pragueType.name,
            order: pragueType.order,
        }
    },

    renderMany(pragueTypes: PragueType[]) {
        return pragueTypes.map(pragueType => this.render(pragueType));
    }
}