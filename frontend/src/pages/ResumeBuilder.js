import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Box,
    Button,
    Typography
} from '@mui/material';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import TemplateSelector from '../components/templates/TemplateSelector';

const steps = ['Template', 'Personal Info', 'Experience', 'Education', 'Skills', 'Projects'];

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const [activeStep, setActiveStep] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState('professional');
    const [resumeData, setResumeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedin: '',
        website: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        template: 'professional'
    });

    useEffect(() => {
        if (editId) {
            fetchResumeData();
        }
    }, [editId]);

    const fetchResumeData = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/resumes/${editId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setResumeData(data);
                setSelectedTemplate(data.template || 'professional');
            } else {
                throw new Error('Failed to fetch resume data');
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            saveAndPreview();
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleFormChange = (section) => (data) => {
        setResumeData(prev => {
            if (section === 'personalInfo') {
                return { ...prev, ...data };
            }
            return {
                ...prev,
                [section]: data
            };
        });
    };

    const handleTemplateChange = (templateId) => {
        setSelectedTemplate(templateId);
        setResumeData(prev => ({
            ...prev,
            template: templateId
        }));
    };

    const saveAndPreview = async () => {
        try {
            const url = editId 
                ? `http://localhost:5001/api/resumes/${editId}`
                : 'http://localhost:5001/api/resumes';
            
            const response = await fetch(url, {
                method: editId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(resumeData)
            });

            if (response.ok) {
                const data = await response.json();
                const resumeId = editId || data._id;
                navigate(`/resume/preview/${resumeId}`);
            } else {
                throw new Error('Failed to save resume');
            }
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        onTemplateChange={handleTemplateChange}
                        onContinue={handleNext}
                    />
                );
            case 1:
                return (
                    <PersonalInfoForm
                        data={{
                            firstName: resumeData.firstName,
                            lastName: resumeData.lastName,
                            email: resumeData.email,
                            phone: resumeData.phone,
                            linkedin: resumeData.linkedin,
                            website: resumeData.website,
                            summary: resumeData.summary
                        }}
                        onChange={handleFormChange('personalInfo')}
                    />
                );
            case 2:
                return (
                    <ExperienceForm
                        data={resumeData.experience}
                        onChange={handleFormChange('experience')}
                    />
                );
            case 3:
                return (
                    <EducationForm
                        data={resumeData.education}
                        onChange={handleFormChange('education')}
                    />
                );
            case 4:
                return (
                    <SkillsForm
                        data={resumeData.skills}
                        onChange={handleFormChange('skills')}
                    />
                );
            case 5:
                return (
                    <ProjectsForm
                        data={resumeData.projects}
                        onChange={handleFormChange('projects')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {editId ? 'Edit Your Resume' : 'Create Your Resume'}
                </Typography>
                
                <Stepper activeStep={activeStep} sx={{ my: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {activeStep !== 0 && (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ResumeBuilder; 