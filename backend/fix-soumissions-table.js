const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function fixSoumissionsTable() {
    try {
        console.log('Correction de la table soumissions...');
        
        // Supprimer la table existante
        await pool.query('DROP TABLE IF EXISTS soumissions CASCADE');
        console.log('✓ Table soumissions supprimée');
        
        // Recréer avec le bon schéma
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
        console.log('✓ Table soumissions recréée avec le bon schéma');
        
        // Vérifier les nouvelles colonnes
        const columns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'soumissions' 
            ORDER BY ordinal_position
        `);
        
        console.log('\nNouvelles colonnes:');
        columns.rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
        
        console.log('\n✓ Correction terminée avec succès!');
    } catch (error) {
        console.error('Erreur lors de la correction:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

fixSoumissionsTable();
