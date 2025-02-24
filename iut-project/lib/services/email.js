'use strict';

const { Service } = require('@hapipal/schmervice');
const Nodemailer = require('nodemailer');

module.exports = class EmailService extends Service {
    constructor() {
        super();
        
        this.transporter = Nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendWelcomeEmail(user) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: user.mail,
            subject: 'Bienvenue sur notre application !',
            html: `
                <h1>Bienvenue ${user.firstName} !</h1>
                <p>Nous sommes ravis de vous compter parmi nos utilisateurs.</p>
                <p>Votre compte a été créé avec succès.</p>
            `
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            return null;
        }
    }
}
