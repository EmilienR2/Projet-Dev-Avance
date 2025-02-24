'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().required().min(3).example('johndoe').description('Username for login'),
            password: Joi.string().required().min(8).description('User password - Must contain at least 8 characters'),
            mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'email'] } })
                .required().example('john.doe@example.com').description('User email address'),
            role: Joi.string().valid('user', 'admin').default('user').description('User role - Either user or admin')
          })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},
{
    method: 'get',
    path: '/users',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();
    
        return await userService.list();
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('User identifier')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        
        await userService.delete(request.params.id);
        return '';
    }
},
{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('User identifier')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).example('johndoe').description('Username for login'),
                password: Joi.string().min(8).description('User password - Must contain at least 8 characters'),
                mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
                    .example('john.doe@example.com').description('User email address')
            }).min(1) // Au moins un champ doit être fourni
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        
        return await userService.update(request.params.id, request.payload);
    }
},
{
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().email().required().description('User email address'),
                password: Joi.string().required().description('User password')
            })
        },
        response: {
            schema: Joi.object({
                token: Joi.string().required().description('JWT token'),
                user: Joi.object({
                    id: Joi.number().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    username: Joi.string().required(),
                    role: Joi.string().valid('user', 'admin').required()
                }).required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        
        const result = await userService.login(request.payload.mail, request.payload.password);
        
        if (!result) {
            throw Boom.unauthorized('Invalid email or password');
        }
        
        return result;
    }
}];