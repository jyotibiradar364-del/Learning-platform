const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    try {
        console.log('Applying schema.sql...');
        const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
        await connection.query(schema);
        console.log('Schema applied successfully.');

        console.log('Applying seed.sql...');
        const seed = fs.readFileSync(path.join(__dirname, '..', 'seed.sql'), 'utf8');
        await connection.query(seed);
        console.log('Seed data applied successfully.');

    } catch (error) {
        console.error('Error initializing database:', error.message);
    } finally {
        await connection.end();
    }
}

initDB();
