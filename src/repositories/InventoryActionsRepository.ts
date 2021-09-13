import { EntityRepository, Repository } from 'typeorm';

import InventoryActionsModel from '../models/InventoryActionsModel';

@EntityRepository(InventoryActionsModel)
class InventoryActionsRepository extends Repository<InventoryActionsModel> { }

export { InventoryActionsRepository };