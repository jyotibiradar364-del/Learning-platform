-- Sample Data for LMS

-- Insert a Subject
INSERT INTO subjects (title, slug, description, is_published) 
VALUES ('Full Stack Web Development', 'web-dev', 'Master modern web development with Next.js, Express, and MySQL. This course covers everything from basic HTML to complex database management.', TRUE);

-- Insert Sections for the Subject
INSERT INTO sections (subject_id, title, order_index) VALUES (1, 'Introduction', 1);
INSERT INTO sections (subject_id, title, order_index) VALUES (1, 'Backend Development', 2);

-- Insert Videos for the Sections
INSERT INTO videos (section_id, title, description, youtube_url, order_index, duration_seconds) 
VALUES (1, 'Course Overview', 'An introduction to what you will learn in this course.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, 212);

INSERT INTO videos (section_id, title, description, youtube_url, order_index, duration_seconds) 
VALUES (2, 'Node.js & Express Basics', 'Learn the fundamentals of building servers with Node.js.', 'https://www.youtube.com/watch?v=TlB_eWDSMt4', 1, 3600);

INSERT INTO videos (section_id, title, description, youtube_url, order_index, duration_seconds) 
VALUES (2, 'MySQL Integration', 'How to connect your Express app to a MySQL database.', 'https://www.youtube.com/watch?v=HXXVVPZDq7I', 2, 2400);
