const pool = require('../config/db');

class Subject {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM subjects WHERE is_published = TRUE');
        return rows;
    }

    static async getBySlug(slug) {
        const [rows] = await pool.execute('SELECT * FROM subjects WHERE slug = ?', [slug]);
        return rows[0];
    }

    static async getSections(subjectId) {
        const [rows] = await pool.execute(
            'SELECT * FROM sections WHERE subject_id = ? ORDER BY order_index ASC',
            [subjectId]
        );
        return rows;
    }

    static async getVideos(sectionId) {
        const [rows] = await pool.execute(
            'SELECT * FROM videos WHERE section_id = ? ORDER BY order_index ASC',
            [sectionId]
        );
        return rows;
    }

    static async isEnrolled(userId, subjectId) {
        const [rows] = await pool.execute(
            'SELECT id FROM enrollments WHERE user_id = ? AND subject_id = ?',
            [userId, subjectId]
        );
        return rows.length > 0;
    }

    static async enroll(userId, subjectId) {
        await pool.execute('INSERT INTO enrollments (user_id, subject_id) VALUES (?, ?)', [userId, subjectId]);
    }
}

module.exports = Subject;
