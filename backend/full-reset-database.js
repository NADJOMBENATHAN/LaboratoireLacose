const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const SALT_ROUNDS = 10;

async function fullResetDatabase() {
    try {
        console.log('=== Réinitialisation complète de la base de données ===\n');
        
        // 1. Supprimer toutes les tables dans l'ordre inverse des dépendances
        console.log('1. Suppression des tables existantes...');
        const tables = [
            'notifications',
            'evaluations',
            'experiences',
            'soumissions',
            'articles_recherche',
            'travaux_pratiques',
            'laboratoires',
            'partenaires',
            'professeurs',
            'etudiants',
            'administrateurs',
            'utilisateurs'
        ];
        
        for (const table of tables) {
            await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
            console.log(`  ✓ Table ${table} supprimée`);
        }
        
        // 2. Recréer toutes les tables avec le bon schéma
        console.log('\n2. Création des tables avec le bon schéma...');
        
        // Table utilisateurs (table de base)
        await pool.query(`
            CREATE TABLE utilisateurs (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mot_de_passe VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table utilisateurs créée');
        
        // Table administrateurs
        await pool.query(`
            CREATE TABLE administrateurs (
                id INTEGER PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                niveau_acces INTEGER DEFAULT 1
            );
        `);
        console.log('  ✓ Table administrateurs créée');
        
        // Table étudiants
        await pool.query(`
            CREATE TABLE etudiants (
                id INTEGER PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                numero_etudiant VARCHAR(20) UNIQUE NOT NULL,
                niveau_etude VARCHAR(50),
                filiere VARCHAR(100)
            );
        `);
        console.log('  ✓ Table etudiants créée');
        
        // Table professeurs
        await pool.query(`
            CREATE TABLE professeurs (
                id INTEGER PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                specialite VARCHAR(100),
                departement VARCHAR(100),
                grade VARCHAR(50)
            );
        `);
        console.log('  ✓ Table professeurs créée');
        
        // Table partenaires
        await pool.query(`
            CREATE TABLE partenaires (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mot_de_passe VARCHAR(255) NOT NULL,
                nom_entreprise VARCHAR(200),
                type_partenariat VARCHAR(100),
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table partenaires créée');
        
        // Table laboratoires
        await pool.query(`
            CREATE TABLE laboratoires (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(200) NOT NULL,
                description TEXT,
                responsable_id INTEGER REFERENCES professeurs(id) ON DELETE SET NULL,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table laboratoires créée');
        
        // Table travaux_pratiques (projets)
        await pool.query(`
            CREATE TABLE travaux_pratiques (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(200) NOT NULL,
                description TEXT,
                laboratoire_id INTEGER REFERENCES laboratoires(id) ON DELETE SET NULL,
                professeur_id INTEGER REFERENCES professeurs(id) ON DELETE SET NULL,
                date_debut DATE,
                date_fin DATE,
                statut VARCHAR(50) DEFAULT 'planifie',
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table travaux_pratiques créée');
        
        // Table articles_recherche (publications)
        await pool.query(`
            CREATE TABLE articles_recherche (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(300) NOT NULL,
                resume TEXT,
                contenu TEXT,
                auteur_id INTEGER REFERENCES professeurs(id) ON DELETE SET NULL,
                statut VARCHAR(50) DEFAULT 'brouillon',
                date_publication DATE,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table articles_recherche créée');
        
        // Table soumissions
        await pool.query(`
            CREATE TABLE soumissions (
                id SERIAL PRIMARY KEY,
                etudiant_id INTEGER REFERENCES etudiants(id) ON DELETE CASCADE,
                travail_pratique_id INTEGER REFERENCES travaux_pratiques(id) ON DELETE CASCADE,
                contenu TEXT,
                date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(etudiant_id, travail_pratique_id)
            );
        `);
        console.log('  ✓ Table soumissions créée');
        
        // Table evaluations
        await pool.query(`
            CREATE TABLE evaluations (
                id SERIAL PRIMARY KEY,
                soumission_id INTEGER REFERENCES soumissions(id) ON DELETE CASCADE,
                professeur_id INTEGER REFERENCES professeurs(id) ON DELETE CASCADE,
                note DECIMAL(3,2) CHECK (note >= 0 AND note <= 20),
                commentaire TEXT,
                date_evaluation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(soumission_id, professeur_id)
            );
        `);
        console.log('  ✓ Table evaluations créée');
        
        // Table experiences
        await pool.query(`
            CREATE TABLE experiences (
                id SERIAL PRIMARY KEY,
                travail_pratique_id INTEGER REFERENCES travaux_pratiques(id) ON DELETE CASCADE,
                titre VARCHAR(200) NOT NULL,
                description TEXT,
                difficulte VARCHAR(50),
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table experiences créée');
        
        // Table notifications
        await pool.query(`
            CREATE TABLE notifications (
                id SERIAL PRIMARY KEY,
                destinataire_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
                type VARCHAR(50) NOT NULL,
                titre VARCHAR(200) NOT NULL,
                contenu TEXT,
                lue BOOLEAN DEFAULT FALSE,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('  ✓ Table notifications créée');
        
        // 3. Créer l'administrateur par défaut
        console.log('\n3. Création de l\'administrateur par défaut...');
        const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
        
        const adminResult = await pool.query(
            `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
             VALUES ($1, $2, $3, $4, 'administrateur') 
             RETURNING id`,
            ['Admin', 'Système', 'admin@lacose.tg', hashedPassword]
        );
        
        const adminId = adminResult.rows[0].id;
        
        await pool.query(
            `INSERT INTO administrateurs (id, niveau_acces) VALUES ($1, 3)`,
            [adminId]
        );
        
        console.log('  ✓ Administrateur créé (admin@lacose.tg / admin123)');
        
        console.log('\n=== Réinitialisation terminée avec succès ===');
        console.log('\nTables créées :');
        tables.reverse().forEach(table => console.log(`  - ${table}`));
        
        console.log('\nPour ajouter des données de démonstration, exécutez :');
        console.log('  node seed-database.js');
        
    } catch (error) {
        console.error('Erreur lors de la réinitialisation:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

fullResetDatabase();
