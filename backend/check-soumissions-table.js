const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function checkSoumissionsTable() {
    try {
        console.log('Vérification de la table soumissions...');
        
        const columns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'soumissions' 
            ORDER BY ordinal_position
        `);
        
        console.log('Colonnes actuelles:');
        if (columns.rows.length === 0) {
            console.log('  (La table n\'existe pas)');
        } else {
            columns.rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
        }
        
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await pool.end();
    }
}

checkSoumissionsTable();
