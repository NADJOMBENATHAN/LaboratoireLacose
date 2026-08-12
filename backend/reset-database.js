const pool = require('./db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function resetDatabase() {
    console.log('Début de la réinitialisation de la base de données...');
    
    try {
        await pool.query('BEGIN');

        // Supprimer toutes les données (dans l'ordre des dépendances)
        console.log('Suppression des données existantes...');
        
        await pool.query('DELETE FROM notifications');
        await pool.query('DELETE FROM evaluations');
        await pool.query('DELETE FROM soumissions');
        await pool.query('DELETE FROM experiences');
        await pool.query('DELETE FROM articles_recherche');
        await pool.query('DELETE FROM travaux_pratiques');
        await pool.query('DELETE FROM laboratoires');
        await pool.query('DELETE FROM partenaires');
        await pool.query('DELETE FROM etudiants');
        await pool.query('DELETE FROM professeurs');
        await pool.query('DELETE FROM administrateurs');
        await pool.query('DELETE FROM utilisateurs');

        console.log('✓ Données supprimées');

        // Créer l'administrateur de test
        console.log('Création de l\'administrateur de test...');
        
        const adminEmail = 'admin@lacose.tg';
        const adminPassword = 'admin123';
        const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS);

        // Insérer l'utilisateur administrateur
        const userResult = await pool.query(
            `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id`,
            ['Admin', 'Test', adminEmail, hashedPassword, 'administrateur']
        );

        const adminId = userResult.rows[0].id;

        // Insérer dans la table administrateurs avec niveau super admin
        await pool.query(
            `INSERT INTO administrateurs (id, niveau_acces) 
             VALUES ($1, $2)`,
            [adminId, 3] // 3 = super admin
        );

        console.log('✓ Administrateur de test créé');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Mot de passe: ${adminPassword}`);
        console.log(`   Niveau: Super Admin`);

        await pool.query('COMMIT');

        console.log('\n=== Réinitialisation terminée avec succès ===');
        console.log('Vous pouvez maintenant vous connecter avec:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Mot de passe: ${adminPassword}`);

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Erreur lors de la réinitialisation:', error);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('\nConnexion à la base de données fermée.');
    }
}

resetDatabase().then(() => {
    console.log('Script terminé.');
    process.exit(0);
}).catch((error) => {
    console.error('Erreur fatale:', error);
    process.exit(1);
});
