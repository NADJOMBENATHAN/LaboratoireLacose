const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function fixPartenairesTable() {
    try {
        console.log('Vérification et correction de la table partenaires...');
        
        // Vérifier les colonnes actuelles
        const columns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'partenaires' 
            ORDER BY ordinal_position
        `);
        
        console.log('Colonnes actuelles:');
        columns.rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
        
        const columnNames = columns.rows.map(row => row.column_name);
        
        // Supprimer la table et la recréer avec le bon schéma
        console.log('\nSuppression de la table partenaires...');
        await pool.query('DROP TABLE IF EXISTS partenaires CASCADE');
        console.log('✓ Table supprimée');
        
        console.log('\nCréation de la table partenaires avec le bon schéma...');
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
        console.log('✓ Table créée avec succès');
        
        // Vérifier les nouvelles colonnes
        const newColumns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'partenaires' 
            ORDER BY ordinal_position
        `);
        
        console.log('\nNouvelles colonnes:');
        newColumns.rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
        
        console.log('\n✓ Migration terminée avec succès!');
    } catch (error) {
        console.error('Erreur lors de la migration:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

fixPartenairesTable();
