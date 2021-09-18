import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import servicePragueTypeView from '../views/servicePragueTypeView';
import { ServicePragueTypesRepository } from '../repositories/ServicePragueTypesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicePragueTypesRepository = getCustomRepository(ServicePragueTypesRepository);

        const servicePragueTypes = await servicePragueTypesRepository.find();

        return response.json(servicePragueTypeView.renderMany(servicePragueTypes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicePragueTypesRepository = getCustomRepository(ServicePragueTypesRepository);

        const servicePragueTypes = await servicePragueTypesRepository.findOneOrFail(id);

        return response.json(servicePragueTypeView.render(servicePragueTypes));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            service,
            prague,
        } = request.body;

        const servicePragueTypesRepository = getCustomRepository(ServicePragueTypesRepository);

        const data = {
            service,
            prague,
        };

        const schema = Yup.object().shape({
            service: Yup.string().required(),
            prague: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const servicePragueTypes = servicePragueTypesRepository.create(data);

        await servicePragueTypesRepository.save(servicePragueTypes);

        return response.status(201).json(servicePragueTypeView.render(servicePragueTypes));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            prague,
        } = request.body;

        const servicePragueTypesRepository = getCustomRepository(ServicePragueTypesRepository);

        const data = {
            prague,
        };

        const schema = Yup.object().shape({
            prague: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const servicePragueTypes = servicePragueTypesRepository.create(data);

        await servicePragueTypesRepository.update(id, servicePragueTypes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const servicePragueTypesRepository = getCustomRepository(ServicePragueTypesRepository);

        await servicePragueTypesRepository.delete(id);

        return response.status(204).send();
    }
}