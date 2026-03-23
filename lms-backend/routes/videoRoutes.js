const express = require('express');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/progress', authMiddleware, videoController.updateProgress);
router.get('/progress/:videoId', authMiddleware, videoController.getProgress);
router.get('/subject-progress/:subjectId', authMiddleware, videoController.getSubjectProgress);

module.exports = router;
