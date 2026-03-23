const Subject = require('../models/subjectModel');

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.getAll();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSubjectDetails = async (req, res) => {
    try {
        const subject = await Subject.getBySlug(req.params.slug);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        const sections = await Subject.getSections(subject.id);
        const sectionsWithVideos = await Promise.all(sections.map(async (section) => {
            const videos = await Subject.getVideos(section.id);
            return { ...section, videos };
        }));

        res.json({ ...subject, sections: sectionsWithVideos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.enroll = async (req, res) => {
    try {
        const { subjectId } = req.body;
        const enrolled = await Subject.isEnrolled(req.user.id, subjectId);
        if (enrolled) return res.status(400).json({ message: 'Already enrolled' });

        await Subject.enroll(req.user.id, subjectId);
        res.status(201).json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkEnrollment = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const enrolled = await Subject.isEnrolled(req.user.id, subjectId);
        res.json({ enrolled });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
