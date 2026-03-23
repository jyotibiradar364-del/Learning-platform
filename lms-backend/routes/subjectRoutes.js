const express = require('express');
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', subjectController.getSubjects);
router.get('/:slug', subjectController.getSubjectDetails);
router.post('/enroll', authMiddleware, subjectController.enroll);
router.get('/enrollment/:subjectId', authMiddleware, subjectController.checkEnrollment);

module.exports = router;
