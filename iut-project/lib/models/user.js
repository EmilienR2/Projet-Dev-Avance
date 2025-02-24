'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).required().example('johndoe').description('Username for login'),
            password: Joi.string().min(8).required().description('User password - Must contain at least 8 characters'),
            mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'email'] } }).required()
                .example('john.doe@example.com').description('User email address'),
            role: Joi.string().valid('user', 'admin').default('user').description('User role - Either user or admin'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.role = this.role || 'user';  // Set default role if not specified
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

    static get jsonAttributes() {
        return ['scope'];
    }
};