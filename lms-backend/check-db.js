const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        const [rows] = await connection.query(`SHOW DATABASES LIKE '${process.env.DB_NAME}'`);
        if (rows.length === 0) {
            console.log(`Database ${process.env.DB_NAME} does not exist.`);
        } else {
            console.log(`Database ${process.env.DB_NAME} exists.`);
        }
        await connection.end();
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
    }
}

checkDB();
