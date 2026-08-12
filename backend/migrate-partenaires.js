const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function migratePartenaires() {
    try {
        console.log('Début de la migration des partenaires...');
        
        // Vérifier si la colonne entreprise existe
        const checkColumn = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'partenaires' 
            AND column_name = 'entreprise'
        `);
        
        if (checkColumn.rows.length > 0) {
            console.log('Renommage de la colonne entreprise en nom_entreprise...');
            await pool.query(`
                ALTER TABLE partenaires 
                RENAME COLUMN entreprise TO nom_entreprise
            `);
            console.log('✓ Colonne renommée avec succès');
        } else {
            console.log('La colonne entreprise n\'existe pas, migration non nécessaire');
        }
        
        console.log('Migration terminée avec succès!');
    } catch (error) {
        console.error('Erreur lors de la migration:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

migratePartenaires();
