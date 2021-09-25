import { Request, Response } from 'express';
import { Between, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import estimateView from '../views/estimateView';
import { EstimatesRepository } from '../repositories/EstimatesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import EstimatesModel from '../models/EstimatesModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, name, customer } = request.query;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        let estimates: EstimatesModel[] = [];

        if (start && end) {
            estimates = await estimatesRepository.find({
                where: { created_at: Between(start, end) },
                relations: [
                    'customer',
                    'status',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(estimates.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(estimateView.renderMany(estimates));
        }

        if (name) {
            estimates = await estimatesRepository.find({
                where: { name: Like(`%${name}%`) },
                relations: [
                    'customer',
                    'status',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(estimates.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(estimateView.renderMany(estimates));
        }

        if (customer) {
            estimates = await estimatesRepository.find({
                where: { customer: Like(`%${customer}%`) },
                relations: [
                    'customer',
                    'status',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(estimates.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(estimateView.renderMany(estimates));
        }

        estimates = await estimatesRepository.find({
            relations: [
                'customer',
                'status',
            ],
            order: {
                created_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(estimates.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(estimateView.renderMany(estimates));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const estimate = await estimatesRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'user',
                'status',
                'items',
            ]
        });

        return response.json(estimateView.render(estimate));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            same_address,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            discount_percent,
            discount,
            increase_percent,
            increase,
            payment,
            expire_at,
            finish_at,
            notes,
            customer,
            user,
            status,
            items,
        } = request.body;

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            same_address,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            discount_percent,
            discount,
            increase_percent,
            increase,
            payment,
            created_by: userCreator.name,
            expire_at,
            finish_at,
            notes,
            customer,
            user,
            status,
            items,
        };

        const schema = Yup.object().shape({
            same_address: Yup.boolean().notRequired(),
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            neighborhood: Yup.string().required(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            discount_percent: Yup.boolean().notRequired(),
            discount: Yup.number().required(),
            increase_percent: Yup.boolean().notRequired(),
            increase: Yup.number().required(),
            payment: Yup.string().notRequired(),
            created_by: Yup.string().required(),
            expire_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
            notes: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
            user: Yup.string().required(),
            status: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    details: Yup.string().notRequired(),
                    amount: Yup.number().required(),
                    price: Yup.number().required(),
                    order: Yup.number().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const estimate = estimatesRepository.create(data);

        await estimatesRepository.save(estimate);

        return response.status(201).json(estimateView.render(estimate));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            same_address,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            discount_percent,
            discount,
            increase_percent,
            increase,
            payment,
            expire_at,
            finish_at,
            notes,
            customer,
            user,
            status,
        } = request.body;

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const data = {
            same_address,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            discount_percent,
            discount,
            increase_percent,
            increase,
            payment,
            expire_at,
            finish_at,
            notes,
            customer,
            user,
            status,
        };

        const schema = Yup.object().shape({
            same_address: Yup.boolean().notRequired(),
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            neighborhood: Yup.string().required(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            discount_percent: Yup.boolean().notRequired(),
            discount: Yup.number().required(),
            increase_percent: Yup.boolean().notRequired(),
            increase: Yup.number().required(),
            payment: Yup.string().notRequired(),
            expire_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
            notes: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
            status: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const estimate = estimatesRepository.create(data);

        await estimatesRepository.update(id, estimate);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        await estimatesRepository.delete(id);

        return response.status(204).send();
    }
}