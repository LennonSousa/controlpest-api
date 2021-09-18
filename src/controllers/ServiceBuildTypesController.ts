import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import serviceBuildTypeView from '../views/serviceBuildTypeView';
import { ServiceBuildTypesRepository } from '../repositories/ServiceBuildTypesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceBuildTypesRepository = getCustomRepository(ServiceBuildTypesRepository);

        const serviceBuildTypes = await serviceBuildTypesRepository.find();

        return response.json(serviceBuildTypeView.renderMany(serviceBuildTypes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceBuildTypesRepository = getCustomRepository(ServiceBuildTypesRepository);

        const serviceBuildTypes = await serviceBuildTypesRepository.findOneOrFail(id);

        return response.json(serviceBuildTypeView.render(serviceBuildTypes));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            service,
            build,
        } = request.body;

        const serviceBuildTypesRepository = getCustomRepository(ServiceBuildTypesRepository);

        const data = {
            service,
            build,
        };

        const schema = Yup.object().shape({
            service: Yup.string().required(),
            build: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceBuildTypes = serviceBuildTypesRepository.create(data);

        await serviceBuildTypesRepository.save(serviceBuildTypes);

        return response.status(201).json(serviceBuildTypeView.render(serviceBuildTypes));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            build,
        } = request.body;

        const serviceBuildTypesRepository = getCustomRepository(ServiceBuildTypesRepository);

        const data = {
            build,
        };

        const schema = Yup.object().shape({
            build: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceBuildTypes = serviceBuildTypesRepository.create(data);

        await serviceBuildTypesRepository.update(id, serviceBuildTypes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceBuildTypesRepository = getCustomRepository(ServiceBuildTypesRepository);

        await serviceBuildTypesRepository.delete(id);

        return response.status(204).send();
    }
}