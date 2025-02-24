'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async addFavorite(userId, movieId) {
        const { Favorite, Movie } = this.server.models();
        
        // Vérifier si le film existe
        const movie = await Movie.query().findById(movieId);
        if (!movie) {
            throw Boom.notFound('Film non trouvé');
        }

        // Vérifier si le film est déjà en favori
        const existingFavorite = await Favorite.query()
            .where({ userId, movieId })
            .first();
            
        if (existingFavorite) {
            throw Boom.conflict('Ce film est déjà dans vos favoris');
        }

        // Ajouter aux favoris
        return Favorite.query()
            .insertAndFetch({ userId, movieId });
    }

    async removeFavorite(userId, movieId) {
        const { Favorite } = this.server.models();
        
        const deleted = await Favorite.query()
            .where({ userId, movieId })
            .delete();
            
        if (!deleted) {
            throw Boom.notFound('Ce film n\'est pas dans vos favoris');
        }
        
        return '';
    }

    async listFavorites(userId) {
        const { Favorite } = this.server.models();
        
        return Favorite.query()
            .where('userId', userId)
            .withGraphFetched('movie')
            .orderBy('createdAt', 'desc');
    }

    async isFavorite(userId, movieId) {
        const { Favorite } = this.server.models();
        
        const favorite = await Favorite.query()
            .where({ userId, movieId })
            .first();
            
        return !!favorite;
    }

    async findByMovie(movieId) {
        const { Favorite } = this.server.models();
        
        return Favorite.query()
            .where('movieId', movieId)
            .orderBy('createdAt', 'desc');
    }
};
