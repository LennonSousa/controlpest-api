import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import treatmentTypeView from '../views/treatmentTypeView';
import { TreatmentTypesRepository } from '../repositories/TreatmentTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const treatmentTypesRepository = getCustomRepository(TreatmentTypesRepository);

        const treatmentTypes = await treatmentTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(treatmentTypeView.renderMany(treatmentTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const treatmentTypesRepository = getCustomRepository(TreatmentTypesRepository);

        const treatmentType = await treatmentTypesRepository.findOneOrFail(id, {
            relations: [
                'estimates',
            ]
        });

        return response.json(treatmentTypeView.render(treatmentType));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
            active,
        } = request.body;

        const treatmentTypesRepository = getCustomRepository(TreatmentTypesRepository);

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

        const treatmentType = treatmentTypesRepository.create(data);

        await treatmentTypesRepository.save(treatmentType);

        return response.status(201).json(treatmentTypeView.render(treatmentType));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
            active,
        } = request.body;

        const treatmentTypesRepository = getCustomRepository(TreatmentTypesRepository);

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

        const treatmentType = treatmentTypesRepository.create(data);

        await treatmentTypesRepository.update(id, treatmentType);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const treatmentTypesRepository = getCustomRepository(TreatmentTypesRepository);

        await treatmentTypesRepository.delete(id);

        return response.status(204).send();
    }
}