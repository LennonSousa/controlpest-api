import { EntityRepository, Repository } from 'typeorm';

import ServicePragueTypesModel from '../models/ServicePragueTypesModel';

@EntityRepository(ServicePragueTypesModel)
class ServicePragueTypesRepository extends Repository<ServicePragueTypesModel> { }

export { ServicePragueTypesRepository };