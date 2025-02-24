'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [{
    method: 'post',
    path: '/movie',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().min(1).max(255).required()
                    .description('Titre du film'),
                description: Joi.string().min(1).required()
                    .description('Description ou synopsis du film'),
                releaseDate: Joi.date().iso().required()
                    .description('Date de sortie du film'),
                director: Joi.string().min(1).max(255).required()
                    .description('Nom du réalisateur')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.create(request.payload);
    }
},
{
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
    
        return await movieService.list();
    }
},
{
    method: 'get',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Identifiant du film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        
        const movie = await movieService.getById(request.params.id);
        
        if (!movie) {
            throw Boom.notFound('Film non trouvé');
        }
        
        return movie;
    }
},
{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Identifiant du film')
            }),
            payload: Joi.object({
                title: Joi.string().min(1).max(255)
                    .description('Titre du film'),
                description: Joi.string().min(1)
                    .description('Description ou synopsis du film'),
                releaseDate: Joi.date().iso()
                    .description('Date de sortie du film'),
                director: Joi.string().min(1).max(255)
                    .description('Nom du réalisateur')
            }).min(1)
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        
        const movie = await movieService.update(request.params.id, request.payload);
        
        if (!movie) {
            throw Boom.notFound('Film non trouvé');
        }
        
        return movie;
    }
},
{
    method: 'delete',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Identifiant du film')
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();
        
        await movieService.delete(request.params.id);
        return '';
    }
}];
