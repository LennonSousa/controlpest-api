import { EntityRepository, Repository } from 'typeorm';

import ServiceBuildTypesModel from '../models/ServiceBuildTypesModel';

@EntityRepository(ServiceBuildTypesModel)
class ServiceBuildTypesRepository extends Repository<ServiceBuildTypesModel> { }

export { ServiceBuildTypesRepository };