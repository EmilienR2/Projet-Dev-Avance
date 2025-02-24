'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).max(255).required()
                .description('Titre du film'),
            description: Joi.string().min(1).required()
                .description('Description ou synopsis du film'),
            releaseDate: Joi.date().iso().required()
                .description('Date de sortie du film'),
            director: Joi.string().min(1).max(255).required()
                .description('Nom du réalisateur'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};
