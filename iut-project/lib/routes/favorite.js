'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/favorites/movies/{movieId}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                movieId: Joi.number().integer().required().description('Identifiant du film')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const userId = request.auth.credentials.id;
        
        return await favoriteService.addFavorite(userId, request.params.movieId);
    }
},
{
    method: 'delete',
    path: '/favorites/movies/{movieId}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                movieId: Joi.number().integer().required().description('Identifiant du film')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const userId = request.auth.credentials.id;
        
        return await favoriteService.removeFavorite(userId, request.params.movieId);
    }
},
{
    method: 'get',
    path: '/favorites/movies',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const userId = request.auth.credentials.id;
        
        return await favoriteService.listFavorites(userId);
    }
},
{
    method: 'get',
    path: '/favorites/movies/{movieId}',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                movieId: Joi.number().integer().required().description('Identifiant du film')
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const userId = request.auth.credentials.id;
        
        return { isFavorite: await favoriteService.isFavorite(userId, request.params.movieId) };
    }
}];
