import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button
} from '@mui/material';
import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';

const templates = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'Clean and traditional layout perfect for corporate environments',
        component: ProfessionalTemplate
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary design with interactive elements and modern styling',
        component: ModernTemplate
    }
];

const TemplateSelector = ({ selectedTemplate, onTemplateChange, onContinue }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Choose Your Resume Template
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Select a template that best represents your professional style
            </Typography>

            <RadioGroup
                value={selectedTemplate}
                onChange={(e) => onTemplateChange(e.target.value)}
            >
                <Grid container spacing={3}>
                    {templates.map((template) => (
                        <Grid item xs={12} md={6} key={template.id}>
                            <Paper
                                elevation={selectedTemplate === template.id ? 4 : 1}
                                sx={{
                                    p: 3,
                                    cursor: 'pointer',
                                    border: selectedTemplate === template.id ? '2px solid #3498db' : '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: 3,
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                                onClick={() => onTemplateChange(template.id)}
                            >
                                <FormControlLabel
                                    value={template.id}
                                    control={<Radio />}
                                    label={
                                        <Box>
                                            <Typography variant="h6" sx={{ mb: 1 }}>
                                                {template.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {template.description}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ width: '100%', m: 0 }}
                                />
                                
                                <Box
                                    sx={{
                                        mt: 2,
                                        height: '300px',
                                        overflow: 'hidden',
                                        borderRadius: 1,
                                        border: '1px solid #e0e0e0',
                                        backgroundColor: '#ffffff',
                                        p: 2
                                    }}
                                >
                                    <template.component
                                        data={{
                                            firstName: 'John',
                                            lastName: 'Doe',
                                            email: 'john.doe@example.com',
                                            phone: '(123) 456-7890',
                                            linkedin: 'linkedin.com/in/johndoe',
                                            website: 'johndoe.com',
                                            summary: 'Experienced software engineer with 5+ years of experience in web development...',
                                            experience: [{
                                                title: 'Senior Software Engineer',
                                                company: 'Tech Company Inc.',
                                                startDate: 'Jan 2020',
                                                endDate: 'Present',
                                                description: 'Led development of enterprise applications...'
                                            }],
                                            education: [{
                                                degree: 'Bachelor of Science in Computer Science',
                                                institution: 'University of Technology',
                                                startDate: '2015',
                                                endDate: '2019'
                                            }],
                                            skills: [
                                                { name: 'JavaScript', type: 'technical' },
                                                { name: 'React', type: 'technical' },
                                                { name: 'Node.js', type: 'technical' },
                                                { name: 'Leadership', type: 'soft' },
                                                { name: 'Communication', type: 'soft' }
                                            ]
                                        }}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={onContinue}
                    size="large"
                    sx={{ px: 4 }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
};

export default TemplateSelector; 