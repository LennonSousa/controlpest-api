import { Request, Response } from 'express';
import { Between, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import productView from '../views/productView';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import ProductsModel from '../models/ProductsModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { limit = 10, page = 1, name, user } = request.query;

        if (! await UsersRolesController.can(user_id, "products", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const productsRepository = getCustomRepository(ProductsRepository);

        let products: ProductsModel[] = [];

        if (name) {
            products = await productsRepository.find({
                where: { name: Like(`%${name}%`) },
                relations: [
                    'category',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(products.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(productView.renderMany(products));
        }

        if (user) {
            products = await productsRepository.find({
                where: { user: Like(`%${user}%`) },
                relations: [
                    'category',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(products.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(productView.renderMany(products));
        }

        products = await productsRepository.find({
            relations: [
                'category',
            ],
            order: {
                created_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(products.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(productView.renderMany(products));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOneOrFail(id, {
            relations: [
                'category',
            ]
        });

        return response.json(productView.render(product));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            description,
            code,
            price,
            discount,
            discount_price,
            inventory_amount,
            inventory_min,
            paused,
            order,
            category,
        } = request.body;

        const productsRepository = getCustomRepository(ProductsRepository);

        const data = {
            title,
            description,
            code,
            price,
            discount,
            discount_price,
            inventory_amount,
            inventory_min,
            paused,
            order,
            category,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().notRequired(),
            code: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            discount: Yup.boolean().notRequired(),
            discount_price: Yup.number().notRequired(),
            inventory_amount: Yup.number().notRequired(),
            inventory_min: Yup.number().notRequired(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
            category: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const product = productsRepository.create(data);

        await productsRepository.save(product);

        return response.status(201).json(productView.render(product));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            description,
            code,
            price,
            discount,
            discount_price,
            inventory_amount,
            inventory_min,
            paused,
            order,
            category,
        } = request.body;

        const productsRepository = getCustomRepository(ProductsRepository);

        const data = {
            title,
            description,
            code,
            price,
            discount,
            discount_price,
            inventory_amount,
            inventory_min,
            paused,
            order,
            category,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().notRequired(),
            code: Yup.string().notRequired(),
            price: Yup.number().notRequired(),
            discount: Yup.boolean().notRequired(),
            discount_price: Yup.number().notRequired(),
            inventory_amount: Yup.number().notRequired(),
            inventory_min: Yup.number().notRequired(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
            category: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const product = productsRepository.create(data);

        await productsRepository.update(id, product);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const productsRepository = getCustomRepository(ProductsRepository);

        await productsRepository.delete(id);

        return response.status(204).send();
    }
}