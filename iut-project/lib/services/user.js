'use strict';

const { Service } = require('@hapipal/schmervice');
const Crypto = require('crypto');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

        create(user) {
             const { User } = this.server.models();
             
             // Hash password with SHA-1
             const hashedPassword = Crypto.createHash('sha1')
                                        .update(user.password)
                                        .digest('hex');

             const userToCreate = {
                ...user,
                password: hashedPassword
             };
        
             return User.query().insertAndFetch(userToCreate);
        }    

        list() {
            const { User } = this.server.models();

            return User.query();
        }

        delete(id) {
            const { User } = this.server.models();

            return User.query().deleteById(id);
        }

        verifyPassword(plainTextPassword, hashedPassword) {
            const hash = Crypto.createHash('sha1')
                             .update(plainTextPassword)
                             .digest('hex');
            return hash === hashedPassword;
        }

        async update(id, userData) {
            const { User } = this.server.models();

            // If password is being updated, hash it
            if (userData.password) {
                userData.password = Crypto.createHash('sha1')
                                       .update(userData.password)
                                       .digest('hex');
            }

            return User.query().patchAndFetchById(id, userData);
        }

        async login(mail, password) {
            const { User } = this.server.models();

            const user = await User.query().findOne({ mail });

            if (!user) {
                return null;
            }

            if (this.verifyPassword(password, user.password)) {
                // Generate JWT token
                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.mail,
                        username: user.username,
                        id: user.id,
                        scope: [user.role]
                    },
                    {
                        key: 'random_string',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );

                return {
                    token,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.mail,
                        username: user.username,
                        role: user.role
                    }
                };
            }

            return null;
        }
}
