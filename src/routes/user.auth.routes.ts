import express from 'express';

import CustomersController from '../controllers/CustomersController';

import UsersController from '../controllers/UsersController';
import UsersRolesController from '../controllers/UsersRolesController';
import UsersNewController from '../controllers/UsersNewController';
import UsersResetsController from '../controllers/UsersResetsController';

import usersAuthMiddleware from '../middlewares/usersAuth';
import CustomerTypesController from '../controllers/CustomerTypesController';
import CategoriesController from '../controllers/CategoriesController';
import BuildTypesController from '../controllers/BuildTypesController';
import EstimateStatusController from '../controllers/EstimateStatusController';
import EstimateItemsController from '../controllers/EstimateItemsController';
import EstimatesController from '../controllers/EstimatesController';
import InventoryActionsController from '../controllers/InventoryActionsController';
import PragueTypesController from '../controllers/PragueTypesController';
import ProductsController from '../controllers/ProductsController';
import StoreController from '../controllers/StoreController';
import ServiceOrdersController from '../controllers/ServiceOrdersController';
import TreatmentTypesController from '../controllers/TreatmentTypesController';
import ServiceItemsController from '../controllers/ServiceItemsController';
import ServiceBuildTypesController from '../controllers/ServiceBuildTypesController';
import ServicePragueTypesController from '../controllers/ServicePragueTypesController';
import ServiceTreatmentTypesController from '../controllers/ServiceTreatmentTypesController';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/users/authenticated', usersAuthMiddleware, function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.put('/users/reset/:id', usersAuthMiddleware, UsersResetsController.update);

userAuthRoutes.get('/users', usersAuthMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', usersAuthMiddleware, UsersController.show);
userAuthRoutes.post('/users', usersAuthMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

// userAuthRoutes.get('/user/roles/:id', usersAuthMiddleware, UsersRolesController.index);
// userAuthRoutes.get('/users/roles/:id', usersAuthMiddleware, UsersRolesController.show);
userAuthRoutes.get('/user/roles', usersAuthMiddleware, UsersRolesController.generate);
userAuthRoutes.put('/users/roles/:id', usersAuthMiddleware, UsersRolesController.update);

userAuthRoutes.put('/users/new/:id', usersAuthMiddleware, UsersNewController.update);

userAuthRoutes.get('/build-types', usersAuthMiddleware, BuildTypesController.index);
userAuthRoutes.get('/build-types/:id', usersAuthMiddleware, BuildTypesController.show);
userAuthRoutes.post('/build-types', usersAuthMiddleware, BuildTypesController.create);
userAuthRoutes.put('/build-types/:id', usersAuthMiddleware, BuildTypesController.update);
userAuthRoutes.delete('/build-types/:id', usersAuthMiddleware, BuildTypesController.delete);

userAuthRoutes.get('/categories', usersAuthMiddleware, CategoriesController.index);
userAuthRoutes.get('/categories/:id', usersAuthMiddleware, CategoriesController.show);
userAuthRoutes.post('/categories', usersAuthMiddleware, CategoriesController.create);
userAuthRoutes.put('/categories/:id', usersAuthMiddleware, CategoriesController.update);
userAuthRoutes.delete('/categories/:id', usersAuthMiddleware, CategoriesController.delete);

userAuthRoutes.get('/customers/types', usersAuthMiddleware, CustomerTypesController.index);
userAuthRoutes.get('/customers/types/:id', usersAuthMiddleware, CustomerTypesController.show);
userAuthRoutes.post('/customers/types', usersAuthMiddleware, CustomerTypesController.create);
userAuthRoutes.put('/customers/types/:id', usersAuthMiddleware, CustomerTypesController.update);
userAuthRoutes.delete('/customers/types/:id', usersAuthMiddleware, CustomerTypesController.delete);

userAuthRoutes.get('/customers', usersAuthMiddleware, CustomersController.index);
userAuthRoutes.get('/customers/:id', usersAuthMiddleware, CustomersController.show);
userAuthRoutes.post('/customers', usersAuthMiddleware, CustomersController.create);
userAuthRoutes.put('/customers/:id', usersAuthMiddleware, CustomersController.update);
userAuthRoutes.delete('/customers/:id', usersAuthMiddleware, CustomersController.delete);

userAuthRoutes.get('/estimates/status', usersAuthMiddleware, EstimateStatusController.index);
userAuthRoutes.get('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.show);
userAuthRoutes.post('/estimates/status', usersAuthMiddleware, EstimateStatusController.create);
userAuthRoutes.put('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.update);
userAuthRoutes.delete('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.delete);

userAuthRoutes.get('/estimates/items', usersAuthMiddleware, EstimateItemsController.index);
userAuthRoutes.get('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.show);
userAuthRoutes.post('/estimates/items', usersAuthMiddleware, EstimateItemsController.create);
userAuthRoutes.put('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.update);
userAuthRoutes.delete('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.delete);

userAuthRoutes.get('/estimates', usersAuthMiddleware, EstimatesController.index);
userAuthRoutes.get('/estimates/:id', usersAuthMiddleware, EstimatesController.show);
userAuthRoutes.post('/estimates', usersAuthMiddleware, EstimatesController.create);
userAuthRoutes.put('/estimates/:id', usersAuthMiddleware, EstimatesController.update);
userAuthRoutes.delete('/estimates/:id', usersAuthMiddleware, EstimatesController.delete);

userAuthRoutes.get('/inventory/actions', usersAuthMiddleware, InventoryActionsController.index);
userAuthRoutes.get('/inventory/actions/:id', usersAuthMiddleware, InventoryActionsController.show);
userAuthRoutes.post('/inventory/actions', usersAuthMiddleware, InventoryActionsController.create);
userAuthRoutes.put('/inventory/actions/:id', usersAuthMiddleware, InventoryActionsController.update);
userAuthRoutes.delete('/inventory/actions/:id', usersAuthMiddleware, InventoryActionsController.delete);

userAuthRoutes.get('/prague-types', usersAuthMiddleware, PragueTypesController.index);
userAuthRoutes.get('/prague-types/:id', usersAuthMiddleware, PragueTypesController.show);
userAuthRoutes.post('/prague-types', usersAuthMiddleware, PragueTypesController.create);
userAuthRoutes.put('/prague-types/:id', usersAuthMiddleware, PragueTypesController.update);
userAuthRoutes.delete('/prague-types/:id', usersAuthMiddleware, PragueTypesController.delete);

userAuthRoutes.get('/products', usersAuthMiddleware, ProductsController.index);
userAuthRoutes.get('/products/:id', usersAuthMiddleware, ProductsController.show);
userAuthRoutes.post('/products', usersAuthMiddleware, ProductsController.create);
userAuthRoutes.put('/products/:id', usersAuthMiddleware, ProductsController.update);
userAuthRoutes.delete('/products/:id', usersAuthMiddleware, ProductsController.delete);

userAuthRoutes.get('/store', usersAuthMiddleware, StoreController.show);
userAuthRoutes.put('/store/:id', usersAuthMiddleware, StoreController.update);

userAuthRoutes.get('/services/build-types', usersAuthMiddleware, ServiceBuildTypesController.index);
userAuthRoutes.get('/services/build-types/:id', usersAuthMiddleware, ServiceBuildTypesController.show);
userAuthRoutes.post('/services/build-types', usersAuthMiddleware, ServiceBuildTypesController.create);
userAuthRoutes.put('/services/build-types/:id', usersAuthMiddleware, ServiceBuildTypesController.update);
userAuthRoutes.delete('/services/build-types/:id', usersAuthMiddleware, ServiceBuildTypesController.delete);

userAuthRoutes.get('/services/prague-types', usersAuthMiddleware, ServicePragueTypesController.index);
userAuthRoutes.get('/services/prague-types/:id', usersAuthMiddleware, ServicePragueTypesController.show);
userAuthRoutes.post('/services/prague-types', usersAuthMiddleware, ServicePragueTypesController.create);
userAuthRoutes.put('/services/prague-types/:id', usersAuthMiddleware, ServicePragueTypesController.update);
userAuthRoutes.delete('/services/prague-types/:id', usersAuthMiddleware, ServicePragueTypesController.delete);

userAuthRoutes.get('/services/treatment-types', usersAuthMiddleware, ServiceTreatmentTypesController.index);
userAuthRoutes.get('/services/treatment-types/:id', usersAuthMiddleware, ServiceTreatmentTypesController.show);
userAuthRoutes.post('/services/treatment-types', usersAuthMiddleware, ServiceTreatmentTypesController.create);
userAuthRoutes.put('/services/treatment-types/:id', usersAuthMiddleware, ServiceTreatmentTypesController.update);
userAuthRoutes.delete('/services/treatment-types/:id', usersAuthMiddleware, ServiceTreatmentTypesController.delete);

userAuthRoutes.get('/services/items', usersAuthMiddleware, ServiceItemsController.index);
userAuthRoutes.get('/services/items/:id', usersAuthMiddleware, ServiceItemsController.show);
userAuthRoutes.post('/services/items', usersAuthMiddleware, ServiceItemsController.create);
userAuthRoutes.put('/services/items/:id', usersAuthMiddleware, ServiceItemsController.update);
userAuthRoutes.delete('/services/items/:id', usersAuthMiddleware, ServiceItemsController.delete);

userAuthRoutes.get('/services', usersAuthMiddleware, ServiceOrdersController.index);
userAuthRoutes.get('/services/:id', usersAuthMiddleware, ServiceOrdersController.show);
userAuthRoutes.post('/services', usersAuthMiddleware, ServiceOrdersController.create);
userAuthRoutes.put('/services/:id', usersAuthMiddleware, ServiceOrdersController.update);
userAuthRoutes.delete('/services/:id', usersAuthMiddleware, ServiceOrdersController.delete);

userAuthRoutes.get('/treatment-types', usersAuthMiddleware, TreatmentTypesController.index);
userAuthRoutes.get('/treatment-types/:id', usersAuthMiddleware, TreatmentTypesController.show);
userAuthRoutes.post('/treatment-types', usersAuthMiddleware, TreatmentTypesController.create);
userAuthRoutes.put('/treatment-types/:id', usersAuthMiddleware, TreatmentTypesController.update);
userAuthRoutes.delete('/treatment-types/:id', usersAuthMiddleware, TreatmentTypesController.delete);

export default userAuthRoutes;