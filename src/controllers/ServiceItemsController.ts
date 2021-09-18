import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import serviceItemView from '../views/serviceItemView';
import { ServiceItemsRepository } from '../repositories/ServiceItemsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceItemsRepository = getCustomRepository(ServiceItemsRepository);

        const serviceItems = await serviceItemsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(serviceItemView.renderMany(serviceItems));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceItemsRepository = getCustomRepository(ServiceItemsRepository);

        const serviceItems = await serviceItemsRepository.findOneOrFail(id);

        return response.json(serviceItemView.render(serviceItems));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            details,
            amount,
            order,
            service,
        } = request.body;

        const serviceItemsRepository = getCustomRepository(ServiceItemsRepository);

        const data = {
            name,
            details,
            amount,
            order,
            service,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            details: Yup.string().notRequired(),
            amount: Yup.number().required(),
            order: Yup.number().required(),
            service: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceItems = serviceItemsRepository.create(data);

        await serviceItemsRepository.save(serviceItems);

        return response.status(201).json(serviceItemView.render(serviceItems));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            details,
            amount,
            order,
        } = request.body;

        const serviceItemsRepository = getCustomRepository(ServiceItemsRepository);

        const data = {
            name,
            details,
            amount,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            details: Yup.string().notRequired(),
            amount: Yup.number().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceItems = serviceItemsRepository.create(data);

        await serviceItemsRepository.update(id, serviceItems);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceItemsRepository = getCustomRepository(ServiceItemsRepository);

        await serviceItemsRepository.delete(id);

        return response.status(204).send();
    }
}