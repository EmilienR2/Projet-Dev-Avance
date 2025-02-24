'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie) {
        const { Movie } = this.server.models();
        const { notificationService } = this.server.services();
        
        const newMovie = await Movie.query().insertAndFetch(movie);
        
        // Envoyer une notification à tous les utilisateurs
        await notificationService.notifyNewMovie(newMovie);
        
        return newMovie;
    }

    list() {
        const { Movie } = this.server.models();
        
        return Movie.query().orderBy('releaseDate', 'desc');
    }

    getById(id) {
        const { Movie } = this.server.models();
        
        return Movie.query().findById(id);
    }

    async update(id, movieInfo) {
        const { Movie } = this.server.models();
        const { notificationService } = this.server.services();
        
        const updatedMovie = await Movie.query().patchAndFetchById(id, movieInfo);
        
        // Envoyer une notification aux utilisateurs qui ont ce film en favoris
        await notificationService.notifyMovieUpdate(updatedMovie);
        
        return updatedMovie;
    }

    delete(id) {
        const { Movie } = this.server.models();
        
        return Movie.query().deleteById(id);
    }
};
