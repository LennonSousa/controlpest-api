import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';

import customerView from '../views/customerView';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { limit = 10, page = 1, name } = request.query;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        if (name) {
            const customers = await customersRepository.find({
                where: { name: Like(`%${name}%`) },
                relations: [
                    'type',
                ],
                order: {
                    name: "ASC"
                },
            });

            return response.json(customerView.renderMany(customers));
        }

        const totalCustomers = await customersRepository.count();

        const totalPages = Math.ceil(totalCustomers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        const customers = await customersRepository.find({
            relations: [
                'type',
            ],
            order: {
                name: "ASC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        return response.json(customerView.renderMany(customers));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOneOrFail(id, {
            relations: [
                'type',
                'estimates',
                'estimates.customer',
                'estimates.status',
                'serviceOrders',
                'serviceOrders.customer'
            ]
        });

        return response.json(customerView.render(customer));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            owner,
            notes,
            birth,
            type,
        } = request.body;

        const customersRepository = getCustomRepository(CustomersRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const birthDateIso = parseISO(birth);

        const birthDate = format(new Date(birthDateIso), 'yyyy-MM-dd');

        const data = {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            owner,
            notes,
            birth: new Date(`${birthDate} 12:00:00`),
            created_by: user.name,
            type,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            birth: Yup.date().required(),
            created_by: Yup.string().required(),
            type: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.save(customer);

        return response.status(201).json(customerView.render(customer));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            owner,
            notes,
            birth,
            type,
        } = request.body;

        const customersRepository = getCustomRepository(CustomersRepository);

        const birthDateIso = parseISO(birth);

        const birthDate = format(new Date(birthDateIso), 'yyyy-MM-dd');

        const data = {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            owner,
            notes,
            birth: new Date(`${birthDate} 12:00:00`),
            type,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired().nullable(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            birth: Yup.date().required(),
            type: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(id, customer);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}