const mysql = require('mysql2/promise');
require('dotenv').config();

async function seed() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

    const newSubjects = [
        {
            title: 'Advanced React Architecture',
            slug: 'advanced-react',
            description: 'Learn how to build scalable, maintainable enterprise React applications using Next.js, Server Components, and state machines.',
            is_published: true
        },
        {
            title: 'Digital Marketing Analytics',
            slug: 'digital-marketing',
            description: 'Master the numbers behind campaigns. Learn Google Analytics 4, tracking pixels, and conversion rate optimization strategies.',
            is_published: true
        },
        {
            title: 'Figma to Code: High Fidelity',
            slug: 'figma-code',
            description: 'Bridging the gap between design and development. Translate complex Figma prototypes into pixel-perfect React and Tailwind CSS.',
            is_published: true
        },
        {
            title: 'Product Management Fundamentals',
            slug: 'product-management',
            description: 'From ideation to launch. Learn agile methodologies, user story mapping, and how to effectively lead cross-functional teams.',
            is_published: true
        }
    ];

    for (const sub of newSubjects) {
        try {
            await pool.execute(
                'INSERT INTO subjects (title, slug, description, is_published) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=title',
                [sub.title, sub.slug, sub.description, sub.is_published]
            );
            console.log('Inserted:', sub.title);
        } catch (err) {
            console.error('Error inserting:', sub.title, err.message);
        }
    }
    
    // Create at least one dummy section and video for these new subjects so they look populated
    const [rows] = await pool.query('SELECT id, slug FROM subjects');
    
    for (const row of rows) {
        // Just checking if sections exist
        const [sections] = await pool.query('SELECT id FROM sections WHERE subject_id = ?', [row.id]);
        if (sections.length === 0) {
            const [sectionResult] = await pool.execute(
                'INSERT INTO sections (subject_id, title, order_index) VALUES (?, ?, ?)',
                [row.id, 'Module 1: Getting Started', 1]
            );
            
            await pool.execute(
                'INSERT INTO videos (section_id, title, youtube_url, order_index, duration_seconds) VALUES (?, ?, ?, ?, ?)',
                [sectionResult.insertId, 'Introduction Lesson', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, 300]
            );
        }
    }
    
    console.log('Seeding complete.');
    process.exit(0);
}

seed();
