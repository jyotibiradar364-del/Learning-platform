const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const passwords = ['', 'root', 'password', '123456', 'admin', 'mysql'];

async function brutes() {
    for (const pwd of passwords) {
        try {
            console.log(`Trying password: "${pwd}"`);
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: 'root',
                password: pwd
            });
            console.log(`Success! Password is: "${pwd}"`);
            
            // Create DB if not exists
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
            console.log(`Database ${process.env.DB_NAME} created/exists.`);
            
            // Switch to the database
            await connection.query(`USE ${process.env.DB_NAME}`);
            
            // Close connection
            await connection.end();
            return pwd;
        } catch (error) {
            console.log(`Failed with password: "${pwd}" - ${error.message}`);
        }
    }
    return null;
}

brutes().then(pwd => {
    if (pwd !== null) {
        console.log(`Final Password found: "${pwd}"`);
    } else {
        console.log("No common password worked.");
    }
});
