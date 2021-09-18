import { EntityRepository, Repository } from 'typeorm';

import ServiceItemsModel from '../models/ServiceItemsModel';

@EntityRepository(ServiceItemsModel)
class ServiceItemsRepository extends Repository<ServiceItemsModel> { }

export { ServiceItemsRepository };