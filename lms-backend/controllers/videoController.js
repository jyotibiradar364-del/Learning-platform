const pool = require('../config/db');

exports.updateProgress = async (req, res) => {
    try {
        const { videoId, lastPositionSeconds, isCompleted } = req.body;
        const userId = req.user.id;

        const [existing] = await pool.execute(
            'SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?',
            [userId, videoId]
        );

        if (existing.length > 0) {
            await pool.execute(
                'UPDATE video_progress SET last_position_seconds = ?, is_completed = ?, completed_at = ? WHERE user_id = ? AND video_id = ?',
                [lastPositionSeconds, isCompleted, isCompleted ? new Date() : null, userId, videoId]
            );
        } else {
            await pool.execute(
                'INSERT INTO video_progress (user_id, video_id, last_position_seconds, is_completed, completed_at) VALUES (?, ?, ?, ?, ?)',
                [userId, videoId, lastPositionSeconds, isCompleted, isCompleted ? new Date() : null]
            );
        }

        res.json({ message: 'Progress updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProgress = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const [rows] = await pool.execute(
            'SELECT * FROM video_progress WHERE user_id = ? AND video_id = ?',
            [userId, videoId]
        );

        res.json(rows[0] || { last_position_seconds: 0, is_completed: false });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSubjectProgress = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const userId = req.user.id;

        // Get total videos in subject
        const [totalVideos] = await pool.execute(
            'SELECT COUNT(*) as count FROM videos v JOIN sections s ON v.section_id = s.id WHERE s.subject_id = ?',
            [subjectId]
        );

        // Get completed videos in subject
        const [completedVideos] = await pool.execute(
            'SELECT COUNT(*) as count FROM video_progress vp JOIN videos v ON vp.video_id = v.id JOIN sections s ON v.section_id = s.id WHERE vp.user_id = ? AND s.subject_id = ? AND vp.is_completed = TRUE',
            [userId, subjectId]
        );

        res.json({
            total: totalVideos[0].count,
            completed: completedVideos[0].count,
            percentage: totalVideos[0].count > 0 ? (completedVideos[0].count / totalVideos[0].count) * 100 : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
