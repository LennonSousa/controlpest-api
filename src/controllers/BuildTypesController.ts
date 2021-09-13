import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import buildTypeView from '../views/buildTypeView';
import { BuildTypesRepository } from '../repositories/BuildTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const buildTypesRepository = getCustomRepository(BuildTypesRepository);

        const buildTypes = await buildTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(buildTypeView.renderMany(buildTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const buildTypesRepository = getCustomRepository(BuildTypesRepository);

        const buildType = await buildTypesRepository.findOneOrFail(id, {
            relations: [
                'estimates',
            ]
        });

        return response.json(buildTypeView.render(buildType));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
            active,
        } = request.body;

        const buildTypesRepository = getCustomRepository(BuildTypesRepository);

        const data = {
            name,
            order,
            active,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
            active: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const buildType = buildTypesRepository.create(data);

        await buildTypesRepository.save(buildType);

        return response.status(201).json(buildTypeView.render(buildType));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
            active,
        } = request.body;

        const buildTypesRepository = getCustomRepository(BuildTypesRepository);

        const data = {
            name,
            order,
            active,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
            active: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const buildType = buildTypesRepository.create(data);

        await buildTypesRepository.update(id, buildType);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const buildTypesRepository = getCustomRepository(BuildTypesRepository);

        await buildTypesRepository.delete(id);

        return response.status(204).send();
    }
}