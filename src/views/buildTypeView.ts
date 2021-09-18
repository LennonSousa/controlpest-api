import BuildType from '../models/BuildTypesModel';

export default {
    render(buildType: BuildType) {
        return {
            id: buildType.id,
            name: buildType.name,
            order: buildType.order,
        }
    },

    renderMany(buildTypes: BuildType[]) {
        return buildTypes.map(buildType => this.render(buildType));
    }
}