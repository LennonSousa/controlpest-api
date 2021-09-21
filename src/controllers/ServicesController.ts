import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import serviceView from '../views/serviceView';
import { ServicesRepository } from '../repositories/ServicesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicesRepository = getCustomRepository(ServicesRepository);

        const services = await servicesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(serviceView.renderMany(services));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicesRepository = getCustomRepository(ServicesRepository);

        const services = await servicesRepository.findOneOrFail(id);

        return response.json(serviceView.render(services));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            price,
            order,
        } = request.body;

        const servicesRepository = getCustomRepository(ServicesRepository);

        const data = {
            name,
            price,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const services = servicesRepository.create(data);

        await servicesRepository.save(services);

        return response.status(201).json(serviceView.render(services));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            price,
            order,
        } = request.body;

        const servicesRepository = getCustomRepository(ServicesRepository);

        const data = {
            name,
            price,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const services = servicesRepository.create(data);

        await servicesRepository.update(id, services);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicesRepository = getCustomRepository(ServicesRepository);

        await servicesRepository.delete(id);

        return response.status(204).send();
    }
}