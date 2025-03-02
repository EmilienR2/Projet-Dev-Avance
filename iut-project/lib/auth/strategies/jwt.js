'use strict';

module.exports = {
    name: 'jwt',
    scheme: 'jwt',
    options: {
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
        validate: false
    }
};
