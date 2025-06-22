const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get all available templates
router.get('/', auth, (req, res) => {
    const templates = [
        {
            id: 'professional-split',
            name: 'Professional Split',
            description: 'Modern two-column layout with a stylish sidebar',
            preview: '/templates/professional-split-preview.png'
        },
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean and professional design with a modern look',
            preview: '/templates/modern-preview.png'
        },
        {
            id: 'classic',
            name: 'Classic',
            description: 'Traditional resume format with a timeless design',
            preview: '/templates/classic-preview.png'
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Unique and artistic design for creative professionals',
            preview: '/templates/creative-preview.png'
        }
    ];
    res.json(templates);
});

module.exports = router; 