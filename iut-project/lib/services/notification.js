'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class NotificationService extends Service {
    async notifyNewMovie(movie) {
        const { emailService, userService } = this.server.services();
        
        // Récupérer tous les utilisateurs
        const users = await userService.list();
        
        // Envoyer un email à chaque utilisateur
        for (const user of users) {
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: user.mail,
                subject: 'Nouveau film ajouté !',
                html: `
                    <h1>Nouveau film : ${movie.title}</h1>
                    <p>Un nouveau film vient d'être ajouté à notre bibliothèque :</p>
                    <div style="margin: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
                        <h2>${movie.title}</h2>
                        <p><strong>Réalisateur :</strong> ${movie.director}</p>
                        <p><strong>Date de sortie :</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
                        <p><strong>Description :</strong></p>
                        <p>${movie.description}</p>
                    </div>
                `
            };

            try {
                await emailService.transporter.sendMail(mailOptions);
            } catch (error) {
                console.error(`Erreur lors de l'envoi du mail à ${user.mail}:`, error);
            }
        }
    }

    async notifyMovieUpdate(movie) {
        const { emailService, userService, favoriteService } = this.server.services();
        
        // Récupérer tous les utilisateurs qui ont ce film en favoris
        const favorites = await favoriteService.findByMovie(movie.id);
        
        // Pour chaque favori, récupérer l'utilisateur et envoyer un email
        for (const favorite of favorites) {
            const user = await userService.findById(favorite.userId);
            
            if (!user) continue;

            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: user.mail,
                subject: 'Un film de vos favoris a été mis à jour !',
                html: `
                    <h1>Mise à jour : ${movie.title}</h1>
                    <p>Un film de vos favoris vient d'être mis à jour :</p>
                    <div style="margin: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
                        <h2>${movie.title}</h2>
                        <p><strong>Réalisateur :</strong> ${movie.director}</p>
                        <p><strong>Date de sortie :</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
                        <p><strong>Description :</strong></p>
                        <p>${movie.description}</p>
                    </div>
                `
            };

            try {
                await emailService.transporter.sendMail(mailOptions);
            } catch (error) {
                console.error(`Erreur lors de l'envoi du mail à ${user.mail}:`, error);
            }
        }
    }
};
