import { EntityRepository, Repository } from 'typeorm';

import PragueTypesModel from '../models/PragueTypesModel';

@EntityRepository(PragueTypesModel)
class PragueTypesRepository extends Repository<PragueTypesModel> { }

export { PragueTypesRepository };