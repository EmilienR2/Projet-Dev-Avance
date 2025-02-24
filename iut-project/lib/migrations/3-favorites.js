'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('userId').unsigned().notNull().references('id').inTable('user').onDelete('CASCADE');
            table.integer('movieId').unsigned().notNull().references('id').inTable('movie').onDelete('CASCADE');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            
            // Garantit qu'un utilisateur ne peut pas avoir le même film en favori plusieurs fois
            table.unique(['userId', 'movieId']);
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
