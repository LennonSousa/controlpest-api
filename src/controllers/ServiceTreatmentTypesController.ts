import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import serviceTreatmentTypeView from '../views/serviceTreatmentTypeView';
import { ServiceTreatmentTypesRepository } from '../repositories/ServiceTreatmentTypesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceTreatmentTypesRepository = getCustomRepository(ServiceTreatmentTypesRepository);

        const serviceTreatmentTypes = await serviceTreatmentTypesRepository.find();

        return response.json(serviceTreatmentTypeView.renderMany(serviceTreatmentTypes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceTreatmentTypesRepository = getCustomRepository(ServiceTreatmentTypesRepository);

        const serviceTreatmentTypes = await serviceTreatmentTypesRepository.findOneOrFail(id);

        return response.json(serviceTreatmentTypeView.render(serviceTreatmentTypes));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            service,
            treatment,
        } = request.body;

        const serviceTreatmentTypesRepository = getCustomRepository(ServiceTreatmentTypesRepository);

        const data = {
            service,
            treatment,
        };

        const schema = Yup.object().shape({
            service: Yup.string().required(),
            treatment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceTreatmentTypes = serviceTreatmentTypesRepository.create(data);

        await serviceTreatmentTypesRepository.save(serviceTreatmentTypes);

        return response.status(201).json(serviceTreatmentTypeView.render(serviceTreatmentTypes));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            treatment,
        } = request.body;

        const serviceTreatmentTypesRepository = getCustomRepository(ServiceTreatmentTypesRepository);

        const data = {
            treatment,
        };

        const schema = Yup.object().shape({
            treatment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceTreatmentTypes = serviceTreatmentTypesRepository.create(data);

        await serviceTreatmentTypesRepository.update(id, serviceTreatmentTypes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceTreatmentTypesRepository = getCustomRepository(ServiceTreatmentTypesRepository);

        await serviceTreatmentTypesRepository.delete(id);

        return response.status(204).send();
    }
}