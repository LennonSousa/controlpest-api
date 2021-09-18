import { EntityRepository, Repository } from 'typeorm';

import ServiceTreatmentTypesModel from '../models/ServiceTreatmentTypesModel';

@EntityRepository(ServiceTreatmentTypesModel)
class ServiceTreatmentTypesRepository extends Repository<ServiceTreatmentTypesModel> { }

export { ServiceTreatmentTypesRepository };