import { Request, Response } from 'express';
import { Between, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import serviceOrderView from '../views/serviceOrderView';
import { ServiceOrdersRepository } from '../repositories/ServiceOrdersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import ServiceOrdersModel from '../models/ServiceOrdersModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, customer, user } = request.query;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        let serviceOrders: ServiceOrdersModel[] = [];

        if (start && end) {
            serviceOrders = await serviceOrdersRepository.find({
                where: { created_at: Between(start, end) },
                relations: [
                    'customer',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(serviceOrders.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(serviceOrderView.renderMany(serviceOrders));
        }

        if (customer) {
            serviceOrders = await serviceOrdersRepository.find({
                where: { customer: Like(`%${customer}%`) },
                relations: [
                    'customer',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(serviceOrders.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(serviceOrderView.renderMany(serviceOrders));
        }

        if (user) {
            serviceOrders = await serviceOrdersRepository.find({
                where: { user: Like(`%${user}%`) },
                relations: [
                    'status',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(serviceOrders.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(serviceOrderView.renderMany(serviceOrders));
        }

        serviceOrders = await serviceOrdersRepository.find({
            relations: [
                'customer',
            ],
            order: {
                created_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(serviceOrders.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(serviceOrderView.renderMany(serviceOrders));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const serviceOrder = await serviceOrdersRepository.findOneOrFail(id, {
            relations: [
                'customer',
            ]
        });

        return response.json(serviceOrderView.render(serviceOrder));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            other_prague_type,
            other_treatment_type,
            other_build_type,
            build_description,
            animals,
            old_people,
            allergic_people,
            value,
            payment,
            warranty,
            notes,
            start_at,
            finish_at,
            customer,
            user,
            items,
        } = request.body;

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            other_prague_type,
            other_treatment_type,
            other_build_type,
            build_description,
            animals,
            old_people,
            allergic_people,
            value,
            payment,
            warranty,
            notes,
            created_by: userCreator.name,
            start_at,
            finish_at,
            customer,
            user,
            items,
        };

        const schema = Yup.object().shape({
            other_prague_type: Yup.string().notRequired().nullable(),
            other_treatment_type: Yup.string().notRequired().nullable(),
            other_build_type: Yup.string().notRequired().nullable(),
            build_description: Yup.string().notRequired().nullable(),
            animals: Yup.boolean().notRequired(),
            old_people: Yup.boolean().notRequired(),
            allergic_people: Yup.boolean().notRequired(),
            value: Yup.number().notRequired(),
            payment: Yup.string().notRequired().nullable(),
            warranty: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            created_by: Yup.string().required(),
            start_at: Yup.date().required(),
            finish_at: Yup.date().required(),
            customer: Yup.string().required(),
            user: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    details: Yup.number().notRequired(),
                    amount: Yup.number().required(),
                    order: Yup.number().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceOrder = serviceOrdersRepository.create(data);

        await serviceOrdersRepository.save(serviceOrder);

        return response.status(201).json(serviceOrderView.render(serviceOrder));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            other_prague_type,
            other_treatment_type,
            other_build_type,
            build_description,
            animals,
            old_people,
            allergic_people,
            value,
            payment,
            warranty,
            notes,
            start_at,
            finish_at,
            customer,
            user,
        } = request.body;

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            other_prague_type,
            other_treatment_type,
            other_build_type,
            build_description,
            animals,
            old_people,
            allergic_people,
            value,
            payment,
            warranty,
            notes,
            start_at,
            finish_at,
            updated_by: userCreator.name,
            updated_at: new Date(),
            customer,
            user,
        };

        const schema = Yup.object().shape({
            other_prague_type: Yup.string().notRequired().nullable(),
            other_treatment_type: Yup.string().notRequired().nullable(),
            other_build_type: Yup.string().notRequired().nullable(),
            build_description: Yup.string().notRequired().nullable(),
            animals: Yup.boolean().notRequired(),
            old_people: Yup.boolean().notRequired(),
            allergic_people: Yup.boolean().notRequired(),
            value: Yup.number().notRequired(),
            payment: Yup.string().notRequired().nullable(),
            warranty: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            start_at: Yup.date().required(),
            finish_at: Yup.date().required(),
            customer: Yup.string().required(),
            user: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    details: Yup.number().notRequired(),
                    amount: Yup.number().required(),
                    order: Yup.number().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceOrder = serviceOrdersRepository.create(data);

        await serviceOrdersRepository.update(id, serviceOrder);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        await serviceOrdersRepository.delete(id);

        return response.status(204).send();
    }
}