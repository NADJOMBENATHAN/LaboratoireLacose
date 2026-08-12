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

async function seedDatabase() {
    try {
        console.log('=== Début de l\'initialisation des données de démonstration ===\n');
        
        await pool.query('BEGIN');
        
        // 1. Créer des professeurs de démonstration
        console.log('1. Création des professeurs de démonstration...');
        const professeursData = [
            {
                nom: 'Dupont',
                prenom: 'Jean',
                email: 'jean.dupont@lacose.tg',
                mot_de_passe: await bcrypt.hash('prof123', SALT_ROUNDS),
                specialite: 'Intelligence Artificielle',
                departement: 'Informatique',
                grade: 'Professeur'
            },
            {
                nom: 'Martin',
                prenom: 'Marie',
                email: 'marie.martin@lacose.tg',
                mot_de_passe: await bcrypt.hash('prof123', SALT_ROUNDS),
                specialite: 'Biologie Moléculaire',
                departement: 'Biologie',
                grade: 'Maître de Conférences'
            },
            {
                nom: 'Bernard',
                prenom: 'Pierre',
                email: 'pierre.bernard@lacose.tg',
                mot_de_passe: await bcrypt.hash('prof123', SALT_ROUNDS),
                specialite: 'Physique Quantique',
                departement: 'Physique',
                grade: 'Professeur'
            }
        ];
        
        const professeurIds = [];
        for (const prof of professeursData) {
            const userResult = await pool.query(
                `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
                 VALUES ($1, $2, $3, $4, 'professeur') 
                 ON CONFLICT (email) DO UPDATE SET nom = EXCLUDED.nom, prenom = EXCLUDED.prenom
                 RETURNING id`,
                [prof.nom, prof.prenom, prof.email, prof.mot_de_passe]
            );
            const userId = userResult.rows[0].id;
            
            await pool.query(
                `INSERT INTO professeurs (id, specialite, departement, grade) 
                 VALUES ($1, $2, $3, $4) 
                 ON CONFLICT (id) DO UPDATE SET specialite = EXCLUDED.specialite, departement = EXCLUDED.departement, grade = EXCLUDED.grade`,
                [userId, prof.specialite, prof.departement, prof.grade]
            );
            professeurIds.push(userId);
            console.log(`  ✓ ${prof.prenom} ${prof.nom} (${prof.email})`);
        }
        
        // 2. Créer des étudiants de démonstration
        console.log('\n2. Création des étudiants de démonstration...');
        const etudiantsData = [
            {
                nom: 'Petit',
                prenom: 'Lucas',
                email: 'lucas.petit@etu.lacose.tg',
                mot_de_passe: await bcrypt.hash('etu123', SALT_ROUNDS),
                numero_etudiant: 'ETU2024001',
                niveau_etude: 'L3',
                filiere: 'Informatique'
            },
            {
                nom: 'Robert',
                prenom: 'Emma',
                email: 'emma.robert@etu.lacose.tg',
                mot_de_passe: await bcrypt.hash('etu123', SALT_ROUNDS),
                numero_etudiant: 'ETU2024002',
                niveau_etude: 'M1',
                filiere: 'Biologie'
            },
            {
                nom: 'Richard',
                prenom: 'Thomas',
                email: 'thomas.richard@etu.lacose.tg',
                mot_de_passe: await bcrypt.hash('etu123', SALT_ROUNDS),
                numero_etudiant: 'ETU2024003',
                niveau_etude: 'L2',
                filiere: 'Physique'
            }
        ];
        
        const etudiantIds = [];
        for (const etud of etudiantsData) {
            const userResult = await pool.query(
                `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) 
                 VALUES ($1, $2, $3, $4, 'etudiant') 
                 ON CONFLICT (email) DO UPDATE SET nom = EXCLUDED.nom, prenom = EXCLUDED.prenom
                 RETURNING id`,
                [etud.nom, etud.prenom, etud.email, etud.mot_de_passe]
            );
            const userId = userResult.rows[0].id;
            
            await pool.query(
                `INSERT INTO etudiants (id, numero_etudiant, niveau_etude, filiere) 
                 VALUES ($1, $2, $3, $4) 
                 ON CONFLICT (id) DO UPDATE SET numero_etudiant = EXCLUDED.numero_etudiant, niveau_etude = EXCLUDED.niveau_etude, filiere = EXCLUDED.filiere`,
                [userId, etud.numero_etudiant, etud.niveau_etude, etud.filiere]
            );
            etudiantIds.push(userId);
            console.log(`  ✓ ${etud.prenom} ${etud.nom} (${etud.email})`);
        }
        
        // 3. Créer des partenaires de démonstration
        console.log('\n3. Création des partenaires de démonstration...');
        const partenairesData = [
            {
                nom: 'Lefevre',
                prenom: 'Sophie',
                email: 'sophie.lefevre@techcorp.com',
                mot_de_passe: await bcrypt.hash('part123', SALT_ROUNDS),
                nom_entreprise: 'TechCorp Industries',
                type_partenariat: 'industriel'
            },
            {
                nom: 'Moreau',
                prenom: 'Antoine',
                email: 'antoine.moreau@univ-recherche.fr',
                mot_de_passe: await bcrypt.hash('part123', SALT_ROUNDS),
                nom_entreprise: 'Université de Recherche',
                type_partenariat: 'academique'
            },
            {
                nom: 'Garcia',
                prenom: 'Isabelle',
                email: 'isabelle.garcia@gouv.tg',
                mot_de_passe: await bcrypt.hash('part123', SALT_ROUNDS),
                nom_entreprise: 'Ministère de la Technologie',
                type_partenariat: 'gouvernemental'
            }
        ];
        
        for (const part of partenairesData) {
            await pool.query(
                `INSERT INTO partenaires (nom, prenom, email, mot_de_passe, nom_entreprise, type_partenariat) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 ON CONFLICT (email) DO UPDATE SET nom = EXCLUDED.nom, prenom = EXCLUDED.prenom, nom_entreprise = EXCLUDED.nom_entreprise, type_partenariat = EXCLUDED.type_partenariat`,
                [part.nom, part.prenom, part.email, part.mot_de_passe, part.nom_entreprise, part.type_partenariat]
            );
            console.log(`  ✓ ${part.prenom} ${part.nom} (${part.nom_entreprise})`);
        }
        
        // 4. Créer des laboratoires de démonstration
        console.log('\n4. Création des laboratoires de démonstration...');
        const laboratoiresData = [
            {
                nom: 'Laboratoire d\'Intelligence Artificielle',
                description: 'Recherche en machine learning, deep learning et réseaux de neurones',
                responsable_id: professeurIds[0]
            },
            {
                nom: 'Laboratoire de Biologie Moléculaire',
                description: 'Étude des mécanismes cellulaires et génomiques',
                responsable_id: professeurIds[1]
            },
            {
                nom: 'Laboratoire de Physique Quantique',
                description: 'Recherche sur les phénomènes quantiques et leurs applications',
                responsable_id: professeurIds[2]
            }
        ];
        
        const laboratoireIds = [];
        for (const lab of laboratoiresData) {
            const result = await pool.query(
                `INSERT INTO laboratoires (nom, description, responsable_id) 
                 VALUES ($1, $2, $3) 
                 ON CONFLICT DO NOTHING 
                 RETURNING id`,
                [lab.nom, lab.description, lab.responsable_id]
            );
            if (result.rows.length > 0) {
                laboratoireIds.push(result.rows[0].id);
                console.log(`  ✓ ${lab.nom}`);
            }
        }
        
        // 5. Créer des travaux pratiques de démonstration
        console.log('\n5. Création des travaux pratiques de démonstration...');
        const travauxPratiquesData = [
            {
                titre: 'Introduction au Machine Learning',
                description: 'TP sur les algorithmes de classification supervisée',
                professeur_id: professeurIds[0],
                laboratoire_id: laboratoireIds[0],
                statut: 'en_cours'
            },
            {
                titre: 'Analyse de Séquences ADN',
                description: 'TP sur l\'alignement de séquences et la phylogénie',
                professeur_id: professeurIds[1],
                laboratoire_id: laboratoireIds[1],
                statut: 'planifie'
            },
            {
                titre: 'Expériences d\'Interférence',
                description: 'TP sur les interférences lumineuses et quantiques',
                professeur_id: professeurIds[2],
                laboratoire_id: laboratoireIds[2],
                statut: 'termine'
            }
        ];
        
        const tpIds = [];
        for (const tp of travauxPratiquesData) {
            const result = await pool.query(
                `INSERT INTO travaux_pratiques (titre, description, professeur_id, laboratoire_id, statut) 
                 VALUES ($1, $2, $3, $4, $5) 
                 RETURNING id`,
                [tp.titre, tp.description, tp.professeur_id, tp.laboratoire_id, tp.statut]
            );
            tpIds.push(result.rows[0].id);
            console.log(`  ✓ ${tp.titre}`);
        }
        
        // 6. Créer des articles de recherche de démonstration
        console.log('\n6. Création des articles de recherche de démonstration...');
        const articlesData = [
            {
                titre: 'Advances in Deep Neural Networks',
                resume: 'Une étude sur les nouvelles architectures de réseaux de neurones profonds',
                contenu: 'Cet article présente une nouvelle approche pour l\'optimisation des réseaux de neurones...',
                auteur_id: professeurIds[0],
                statut: 'publie'
            },
            {
                titre: 'CRISPR-Cas9 Applications',
                resume: 'Applications du CRISPR-Cas9 en thérapie génique',
                contenu: 'Nous explorons les possibilités offertes par CRISPR-Cas9 pour corriger les mutations génétiques...',
                auteur_id: professeurIds[1],
                statut: 'soumis'
            },
            {
                titre: 'Quantum Entanglement Experiments',
                resume: 'Résultats expérimentaux sur l\'intrication quantique',
                contenu: 'Nos expériences démontrent une violation des inégalités de Bell...',
                auteur_id: professeurIds[2],
                statut: 'brouillon'
            }
        ];
        
        for (const art of articlesData) {
            await pool.query(
                `INSERT INTO articles_recherche (titre, resume, contenu, auteur_id, statut) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [art.titre, art.resume, art.contenu, art.auteur_id, art.statut]
            );
            console.log(`  ✓ ${art.titre}`);
        }
        
        // 7. Créer des soumissions de démonstration
        console.log('\n7. Création des soumissions de démonstration...');
        const soumissionsData = [
            {
                etudiant_id: etudiantIds[0],
                travail_pratique_id: tpIds[0],
                contenu: 'Mon rapport sur le TP de machine learning avec les résultats obtenus...'
            },
            {
                etudiant_id: etudiantIds[1],
                travail_pratique_id: tpIds[1],
                contenu: 'Analyse des séquences ADN réalisée avec succès...'
            }
        ];
        
        for (const soum of soumissionsData) {
            await pool.query(
                `INSERT INTO soumissions (etudiant_id, travail_pratique_id, contenu) 
                 VALUES ($1, $2, $3)`,
                [soum.etudiant_id, soum.travail_pratique_id, soum.contenu]
            );
            console.log(`  ✓ Soumission créée`);
        }
        
        await pool.query('COMMIT');
        
        console.log('\n=== Initialisation terminée avec succès ===');
        console.log('\nComptes de démonstration créés :');
        console.log('Administrateur : admin@lacose.tg / admin123');
        console.log('Professeurs : jean.dupont@lacose.tg / prof123');
        console.log('Étudiants : lucas.petit@etu.lacose.tg / etu123');
        console.log('Partenaires : sophie.lefevre@techcorp.com / part123');
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Erreur lors de l\'initialisation:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

seedDatabase();
