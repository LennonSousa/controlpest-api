import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import categoryView from '../views/categoryView';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const categories = await categoriesRepository.find({
            relations: [
                'products',
                'products.category'
            ],
            order: {
                order: "ASC"
            }
        });

        return response.json(categoryView.renderMany(categories));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const category = await categoriesRepository.findOneOrFail(id);

        return response.json(categoryView.render(category));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            paused,
            order,
        } = request.body;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const data = {
            title,
            paused,
            order,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const category = categoriesRepository.create(data);

        await categoriesRepository.save(category);

        return response.status(201).json(categoryView.render(category));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            paused,
            order,
        } = request.body;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const data = {
            title,
            paused,
            order,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const category = categoriesRepository.create(data);

        await categoriesRepository.update(id, category);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "products", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        await categoriesRepository.delete(id);

        return response.status(204).send();
    }
}