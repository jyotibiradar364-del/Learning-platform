const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT id, email, name FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name, email, passwordHash) {
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );
        return result.insertId;
    }
}

module.exports = User;
