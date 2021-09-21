import { EntityRepository, Repository } from 'typeorm';

import ServicesModel from '../models/ServicesModel';

@EntityRepository(ServicesModel)
class ServicesRepository extends Repository<ServicesModel> { }

export { ServicesRepository };