import { EntityRepository, Repository } from 'typeorm';

import BuildTypesModel from '../models/BuildTypesModel';

@EntityRepository(BuildTypesModel)
class BuildTypesRepository extends Repository<BuildTypesModel> { }

export { BuildTypesRepository };