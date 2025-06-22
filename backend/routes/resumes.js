const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Resume = require('../models/Resume');

// Middleware to authenticate user
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

// Create a new resume
router.post('/', auth, async (req, res) => {
    try {
        const resume = new Resume({
            ...req.body,
            user: req.userId
        });
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(400).json({ error: 'Error creating resume' });
    }
});

// Get all resumes for a user
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.userId });
        res.json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ error: 'Error fetching resumes' });
    }
});

// Get a specific resume
router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.userId });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ error: 'Error fetching resume' });
    }
});

// Update a resume
router.put('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(400).json({ error: 'Error updating resume' });
    }
});

// Delete a resume
router.delete('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ error: 'Error deleting resume' });
    }
});

// Export resume as PDF
router.get('/:id/export/pdf', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // TODO: Implement PDF generation logic
        res.json({ message: 'PDF export not implemented yet' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export resume as DOCX
router.get('/:id/export/docx', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // TODO: Implement DOCX generation logic
        res.json({ message: 'DOCX export not implemented yet' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 