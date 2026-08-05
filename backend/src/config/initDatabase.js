const pool = require('../../db');

async function initDatabase() {
    try {
        console.log('Initialisation de la base de données...');

        // Suppression des tables existantes (dans l'ordre inverse pour respecter les clés étrangères)
        await pool.query('DROP TABLE IF EXISTS tp_participants CASCADE');
        await pool.query('DROP TABLE IF EXISTS notifications CASCADE');
        await pool.query('DROP TABLE IF EXISTS evaluations CASCADE');
        await pool.query('DROP TABLE IF EXISTS experiences CASCADE');
        await pool.query('DROP TABLE IF EXISTS soumissions CASCADE');
        await pool.query('DROP TABLE IF EXISTS articles_recherche CASCADE');
        await pool.query('DROP TABLE IF EXISTS travaux_pratiques CASCADE');
        await pool.query('DROP TABLE IF EXISTS laboratoires CASCADE');
        await pool.query('DROP TABLE IF EXISTS administrateurs CASCADE');
        await pool.query('DROP TABLE IF EXISTS partenaires CASCADE');
        await pool.query('DROP TABLE IF EXISTS professeurs CASCADE');
        await pool.query('DROP TABLE IF EXISTS etudiants CASCADE');
        await pool.query('DROP TABLE IF EXISTS utilisateurs CASCADE');

        console.log('Tables existantes supprimées');

        // Table utilisateurs
        await pool.query(`
            CREATE TABLE IF NOT EXISTS utilisateurs (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(100) NOT NULL,
                prenom VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mot_de_passe VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Table étudiants
        await pool.query(`
            CREATE TABLE IF NOT EXISTS etudiants (
                id SERIAL PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                numero_etudiant VARCHAR(50) UNIQUE NOT NULL,
                niveau_etude VARCHAR(50),
                filiere VARCHAR(100)
            )
        `);

        // Table professeurs
        await pool.query(`
            CREATE TABLE IF NOT EXISTS professeurs (
                id SERIAL PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                specialite VARCHAR(100),
                grade VARCHAR(50),
                departement VARCHAR(100)
            )
        `);

        // Table partenaires
        await pool.query(`
            CREATE TABLE IF NOT EXISTS partenaires (
                id SERIAL PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                nom_organisation VARCHAR(200),
                type_partenariat VARCHAR(50),
                contact_telephone VARCHAR(20)
            )
        `);

        // Table administrateurs
        await pool.query(`
            CREATE TABLE IF NOT EXISTS administrateurs (
                id SERIAL PRIMARY KEY REFERENCES utilisateurs(id) ON DELETE CASCADE,
                niveau_acces INTEGER DEFAULT 1,
                date_nomination TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Table laboratoires
        await pool.query(`
            CREATE TABLE IF NOT EXISTS laboratoires (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(200) NOT NULL,
                description TEXT,
                responsable_id INTEGER REFERENCES utilisateurs(id),
                localisation VARCHAR(200),
                capacite INTEGER,
                equipements TEXT
            )
        `);

        // Table travaux pratiques
        await pool.query(`
            CREATE TABLE IF NOT EXISTS travaux_pratiques (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(200) NOT NULL,
                description TEXT,
                laboratoire_id INTEGER REFERENCES laboratoires(id) ON DELETE SET NULL,
                professeur_id INTEGER REFERENCES utilisateurs(id),
                date_debut DATE,
                date_fin DATE,
                statut VARCHAR(50) DEFAULT 'planifie'
            )
        `);

        // Table articles recherche
        await pool.query(`
            CREATE TABLE IF NOT EXISTS articles_recherche (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(300) NOT NULL,
                resume TEXT,
                contenu TEXT,
                auteur_id INTEGER REFERENCES utilisateurs(id),
                date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                statut VARCHAR(50) DEFAULT 'brouillon'
            )
        `);

        // Table soumissions
        await pool.query(`
            CREATE TABLE IF NOT EXISTS soumissions (
                id SERIAL PRIMARY KEY,
                etudiant_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
                travail_pratique_id INTEGER REFERENCES travaux_pratiques(id) ON DELETE CASCADE,
                fichier_url VARCHAR(500),
                date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                note DECIMAL(5,2),
                commentaire TEXT
            )
        `);

        // Table expériences
        await pool.query(`
            CREATE TABLE IF NOT EXISTS experiences (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(200) NOT NULL,
                description TEXT,
                travail_pratique_id INTEGER REFERENCES travaux_pratiques(id) ON DELETE CASCADE,
                protocole TEXT,
                objectifs TEXT,
                duree_estimee INTEGER
            )
        `);

        // Table évaluations
        await pool.query(`
            CREATE TABLE IF NOT EXISTS evaluations (
                id SERIAL PRIMARY KEY,
                soumission_id INTEGER REFERENCES soumissions(id) ON DELETE CASCADE,
                evaluateur_id INTEGER REFERENCES utilisateurs(id),
                note DECIMAL(5,2) NOT NULL,
                commentaire TEXT,
                date_evaluation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Table notifications
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                utilisateur_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
                titre VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                type VARCHAR(50) DEFAULT 'info',
                lue BOOLEAN DEFAULT FALSE,
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Table tp_participants
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tp_participants (
                travail_pratique_id INTEGER REFERENCES travaux_pratiques(id) ON DELETE CASCADE,
                etudiant_id INTEGER REFERENCES utilisateurs(id) ON DELETE CASCADE,
                date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (travail_pratique_id, etudiant_id)
            )
        `);

        // Insertion des données initiales si la table utilisateurs est vide
        const userCount = await pool.query('SELECT COUNT(*) FROM utilisateurs');
        if (parseInt(userCount.rows[0].count) === 0) {
            console.log('Insertion des données initiales...');
            
            await pool.query(`
                INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES
                ('Damegna', 'Koffi', 'koffi.damegna@lacose.tg', '$2b$10$placeholder_hash', 'professeur'),
                ('Wadja', 'Batcha', 'batcha.wadja@lacose.tg', '$2b$10$placeholder_hash', 'professeur'),
                ('Kwamivi', 'Segbeaya', 'segbeaya.kwamivi@lacose.tg', '$2b$10$placeholder_hash', 'professeur'),
                ('Komla', 'Adanlessossi', 'adanlessossi.komla@lacose.tg', '$2b$10$placeholder_hash', 'professeur'),
                ('Admin', 'System', 'admin@lacose.tg', '$2b$10$placeholder_hash', 'administrateur')
            `);

            await pool.query(`
                INSERT INTO professeurs (id, specialite, grade, departement) VALUES
                (1, 'Chimie Organique', 'Professeur', 'Chimie'),
                (2, 'Technique', 'Docteur', 'Laboratoire'),
                (3, 'Analyse', 'Docteur', 'Recherche'),
                (4, 'Recherche', 'Chercheur', 'Chimie')
            `);

            await pool.query(`
                INSERT INTO administrateurs (id, niveau_acces) VALUES
                (5, 3)
            `);

            await pool.query(`
                INSERT INTO laboratoires (nom, description, responsable_id, localisation, capacite) VALUES
                ('Laboratoire de Chimie Organique', 'Laboratoire principal pour les analyses chimiques', 1, 'Bâtiment A, Salle 101', 30),
                ('Laboratoire d''Analyse', 'Laboratoire pour les analyses physico-chimiques', 2, 'Bâtiment B, Salle 205', 20)
            `);

            console.log('Données initiales insérées avec succès');
        }

        console.log('Base de données initialisée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        throw error;
    }
}

module.exports = initDatabase;
