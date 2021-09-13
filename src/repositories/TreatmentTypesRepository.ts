import { EntityRepository, Repository } from 'typeorm';

import TreatmentTypesModel from '../models/TreatmentTypesModel';

@EntityRepository(TreatmentTypesModel)
class TreatmentTypesRepository extends Repository<TreatmentTypesModel> { }

export { TreatmentTypesRepository };