const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    experience: [{
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
        achievements: String
    }],
    education: [{
        school: String,
        degree: String,
        location: String,
        graduationDate: String,
        gpa: String,
        description: String
    }],
    skills: {
        type: [String],
        default: []
    },
    projects: [{
        name: String,
        description: String,
        technologies: String,
        link: String,
        highlights: String
    }],
    template: {
        type: String,
        default: 'professional'
    }
}, {
    timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume; 