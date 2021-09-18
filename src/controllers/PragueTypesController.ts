import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import pragueTypeView from '../views/pragueTypeView';
import { PragueTypesRepository } from '../repositories/PragueTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const pragueTypesRepository = getCustomRepository(PragueTypesRepository);

        const pragueTypes = await pragueTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(pragueTypeView.renderMany(pragueTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const pragueTypesRepository = getCustomRepository(PragueTypesRepository);

        const pragueType = await pragueTypesRepository.findOneOrFail(id, {
            relations: [
                'estimates',
            ]
        });

        return response.json(pragueTypeView.render(pragueType));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const pragueTypesRepository = getCustomRepository(PragueTypesRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const pragueType = pragueTypesRepository.create(data);

        await pragueTypesRepository.save(pragueType);

        return response.status(201).json(pragueTypeView.render(pragueType));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const pragueTypesRepository = getCustomRepository(PragueTypesRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const pragueType = pragueTypesRepository.create(data);

        await pragueTypesRepository.update(id, pragueType);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const pragueTypesRepository = getCustomRepository(PragueTypesRepository);

        await pragueTypesRepository.delete(id);

        return response.status(204).send();
    }
}