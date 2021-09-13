import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import inventoryActionView from '../views/inventoryActionView';
import { InventoryActionsRepository } from '../repositories/InventoryActionsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "inventory", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const inventoryActionsRepository = getCustomRepository(InventoryActionsRepository);

        const inventoryActions = await inventoryActionsRepository.find({
            order: {
                created_at: "DESC"
            }
        });

        return response.json(inventoryActionView.renderMany(inventoryActions));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "inventory", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const inventoryActionsRepository = getCustomRepository(InventoryActionsRepository);

        const inventoryActions = await inventoryActionsRepository.findOneOrFail(id);

        return response.json(inventoryActionView.render(inventoryActions));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "inventory", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            type,
            description,
            transaction_id,
            price,
            amount,
            inventory_amount,
            product,
            user,
        } = request.body;

        const inventoryActionsRepository = getCustomRepository(InventoryActionsRepository);

        const data = {
            type,
            description,
            transaction_id,
            price,
            amount,
            inventory_amount,
            product,
            user,
        };

        const schema = Yup.object().shape({
            type: Yup.string().required(),
            description: Yup.string().notRequired(),
            transaction_id: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            amount: Yup.number().required(),
            inventory_amount: Yup.number().required(),
            product: Yup.string().required(),
            user: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const inventoryActions = inventoryActionsRepository.create(data);

        await inventoryActionsRepository.save(inventoryActions);

        return response.status(201).json(inventoryActionView.render(inventoryActions));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "inventory", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            type,
            description,
            transaction_id,
            price,
            amount,
            inventory_amount,
            product,
            user,
        } = request.body;

        const inventoryActionsRepository = getCustomRepository(InventoryActionsRepository);

        const data = {
            type,
            description,
            transaction_id,
            price,
            amount,
            inventory_amount,
            product,
            user,
        };

        const schema = Yup.object().shape({
            type: Yup.string().required(),
            description: Yup.string().notRequired(),
            transaction_id: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            amount: Yup.number().required(),
            inventory_amount: Yup.number().required(),
            product: Yup.string().required(),
            user: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const inventoryActions = inventoryActionsRepository.create(data);

        await inventoryActionsRepository.update(id, inventoryActions);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "inventory", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const inventoryActionsRepository = getCustomRepository(InventoryActionsRepository);

        await inventoryActionsRepository.delete(id);

        return response.status(204).send();
    }
}