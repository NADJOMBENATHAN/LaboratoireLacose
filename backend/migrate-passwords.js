const pool = require('./db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function migratePasswords() {
    console.log('Début de la migration des mots de passe...');
    
    try {
        // Récupérer tous les utilisateurs
        const result = await pool.query(
            'SELECT id, email, mot_de_passe FROM utilisateurs WHERE mot_de_passe IS NOT NULL'
        );
        
        const users = result.rows;
        console.log(`${users.length} utilisateurs trouvés`);
        
        let migrated = 0;
        let alreadyHashed = 0;
        let errors = 0;
        
        for (const user of users) {
            try {
                // Vérifier si le mot de passe est déjà hashé (bcrypt hash commence par $2a$, $2b$, ou $2y$)
                if (user.mot_de_passe.startsWith('$2a$') || user.mot_de_passe.startsWith('$2b$') || user.mot_de_passe.startsWith('$2y$')) {
                    console.log(`Utilisateur ${user.email}: mot de passe déjà hashé, ignoré`);
                    alreadyHashed++;
                    continue;
                }
                
                // Hasher le mot de passe
                const hashedPassword = await bcrypt.hash(user.mot_de_passe, SALT_ROUNDS);
                
                // Mettre à jour la base de données
                await pool.query(
                    'UPDATE utilisateurs SET mot_de_passe = $1 WHERE id = $2',
                    [hashedPassword, user.id]
                );
                
                console.log(`✓ Utilisateur ${user.email}: mot de passe migré avec succès`);
                migrated++;
                
            } catch (error) {
                console.error(`✗ Erreur pour l'utilisateur ${user.email}:`, error.message);
                errors++;
            }
        }
        
        console.log('\n=== Résumé de la migration ===');
        console.log(`Total utilisateurs: ${users.length}`);
        console.log(`Mots de passe migrés: ${migrated}`);
        console.log(`Déjà hashés: ${alreadyHashed}`);
        console.log(`Erreurs: ${errors}`);
        
        if (migrated > 0) {
            console.log('\n⚠️  IMPORTANT: Les anciens mots de passe en clair ne sont plus utilisables.');
            console.log('Les utilisateurs devront utiliser leurs anciens mots de passe (qui fonctionneront maintenant avec bcrypt).');
        }
        
    } catch (error) {
        console.error('Erreur lors de la migration:', error);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('\nConnexion à la base de données fermée.');
    }
}

// Exécuter la migration
migratePasswords().then(() => {
    console.log('Migration terminée.');
    process.exit(0);
}).catch((error) => {
    console.error('Erreur fatale:', error);
    process.exit(1);
});
