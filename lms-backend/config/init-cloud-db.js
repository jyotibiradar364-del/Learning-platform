const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runSQL() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true
    });

    console.log('Connected to Aiven MySQL!');

    // Run schema.sql
    const schema = fs.readFileSync(path.join(__dirname, '..', '..', 'schema.sql'), 'utf8');
    console.log('Running schema.sql...');
    await connection.query(schema);
    console.log('Schema created successfully!');

    // Run seed.sql
    const seed = fs.readFileSync(path.join(__dirname, '..', '..', 'seed.sql'), 'utf8');
    console.log('Running seed.sql...');
    await connection.query(seed);
    console.log('Seed data inserted successfully!');

    await connection.end();
    console.log('Done! Database is ready.');
}

runSQL().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
