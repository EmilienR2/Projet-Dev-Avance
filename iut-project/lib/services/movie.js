'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    create(movie) {
        const { Movie } = this.server.models();
        
        return Movie.query().insertAndFetch(movie);
    }

    list() {
        const { Movie } = this.server.models();
        
        return Movie.query().orderBy('releaseDate', 'desc');
    }

    getById(id) {
        const { Movie } = this.server.models();
        
        return Movie.query().findById(id);
    }

    update(id, movieInfo) {
        const { Movie } = this.server.models();
        
        return Movie.query().patchAndFetchById(id, movieInfo);
    }

    delete(id) {
        const { Movie } = this.server.models();
        
        return Movie.query().deleteById(id);
    }
};
