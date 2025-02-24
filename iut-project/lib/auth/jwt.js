'use strict';

module.exports = {
    name: 'auth',
    async register(server, options) {

        await server.register(require('@hapi/jwt'));

        server.auth.strategy('jwt', 'jwt', {
            keys: 'random_string',
            verify: {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                sub: false,
                nbf: true,
                exp: true,
                maxAgeSec: 14400, // 4 hours
                timeSkewSec: 15
            },
            validate: (artifacts, request, h) => {
                return {
                    isValid: true,
                    credentials: artifacts.decoded.payload
                };
            }
        });

        server.auth.default('jwt');
    }
};
