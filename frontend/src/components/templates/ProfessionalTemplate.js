import React from 'react';
import { 
    Box, 
    Typography, 
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ResumeSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    color: '#2c3e50',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '1.1rem',
    borderBottom: '2px solid #3498db',
    paddingBottom: theme.spacing(0.5),
}));

const ProfessionalTemplate = ({ data }) => {
    if (!data) return null;

    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        linkedin,
        website,
        summary,
        experience = [],
        education = [],
        skills = [],
        projects = []
    } = data;

    const renderContactInfo = () => {
        const contactItems = [];
        if (email) contactItems.push(<span key="email">{email}</span>);
        if (phone) contactItems.push(<span key="phone">{phone}</span>);
        if (linkedin) {
            contactItems.push(
                <a 
                    key="linkedin" 
                    href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    {linkedin}
                </a>
            );
        }
        if (website) {
            contactItems.push(
                <a 
                    key="website" 
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    {website}
                </a>
            );
        }
        return contactItems.map((item, index) => (
            <React.Fragment key={index}>
                {item}
                {index < contactItems.length - 1 && ' • '}
            </React.Fragment>
        ));
    };

    const renderSkills = () => {
        if (!skills || skills.length === 0) return null;
        // Only use string skills, ignore objects or invalid entries
        const stringSkills = skills.filter(skill => typeof skill === 'string');
        const technicalSkills = stringSkills.filter(skill => skill.endsWith('(Technical)')).map(skill => skill.replace(' (Technical)', ''));
        const softSkills = stringSkills.filter(skill => skill.endsWith('(Soft)')).map(skill => skill.replace(' (Soft)', ''));
        return (
            <ResumeSection>
                <SectionTitle variant="h6">Skills</SectionTitle>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {technicalSkills.length > 0 && (
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1, fontSize: '0.95rem' }}>
                                Technical Skills
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {technicalSkills.map((skill, index) => (
                                    <Typography key={index} variant="body2" sx={{ backgroundColor: '#f1f2f6', padding: '2px 8px', borderRadius: '4px', color: '#2c3e50', fontSize: '0.9rem' }}>{skill}</Typography>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {softSkills.length > 0 && (
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1, fontSize: '0.95rem' }}>
                                Soft Skills
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {softSkills.map((skill, index) => (
                                    <Typography key={index} variant="body2" sx={{ backgroundColor: '#f1f2f6', padding: '2px 8px', borderRadius: '4px', color: '#2c3e50', fontSize: '0.9rem' }}>{skill}</Typography>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </ResumeSection>
        );
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                maxWidth: '8.5in',
                margin: '0 auto',
                padding: 4,
                backgroundColor: '#fff',
                minHeight: '11in',
                fontFamily: '"Calibri", "Arial", sans-serif',
            }}
        >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: '#2c3e50',
                    letterSpacing: '0.5px',
                }}>
                    {firstName} {lastName}
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: '#34495e',
                        fontSize: '1rem',
                        letterSpacing: '0.5px',
                    }}
                >
                    {renderContactInfo()}
                </Typography>
            </Box>

            {/* Professional Summary */}
            {summary && (
                <ResumeSection>
                    <SectionTitle variant="h6">Professional Summary</SectionTitle>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            lineHeight: 1.6,
                            color: '#2c3e50',
                            fontSize: '0.95rem',
                        }}
                    >
                        {summary}
                    </Typography>
                </ResumeSection>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <ResumeSection>
                    <SectionTitle variant="h6">Professional Experience</SectionTitle>
                    {experience.map((exp, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                mb: 0.5,
                                alignItems: 'center'
                            }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        fontSize: '1.05rem'
                                    }}
                                >
                                    {exp.position}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{
                                        color: '#34495e',
                                        fontWeight: 500
                                    }}
                                >
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </Typography>
                            </Box>
                            <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                    color: '#3498db',
                                    mb: 1,
                                    fontWeight: 600,
                                    fontSize: '0.95rem'
                                }}
                            >
                                {exp.company} • {exp.location}
                            </Typography>
                            {exp.description && (
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        mb: 1,
                                        color: '#2c3e50',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {exp.description}
                                </Typography>
                            )}
                            {exp.achievements && (
                                <List dense sx={{ pl: 2 }}>
                                    {exp.achievements.split('\n').map((achievement, i) => (
                                        <ListItem key={i} sx={{ py: 0.3 }}>
                                            <ListItemText 
                                                primary={achievement}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    sx: { 
                                                        color: '#2c3e50',
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.5
                                                    }
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    ))}
                </ResumeSection>
            )}

            {/* Education */}
            {education.length > 0 && (
                <ResumeSection>
                    <SectionTitle variant="h6">Education</SectionTitle>
                    {education.map((edu, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                mb: 0.5,
                                alignItems: 'center'
                            }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: '#2c3e50',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {edu.degree}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{
                                        color: '#34495e',
                                        fontWeight: 500
                                    }}
                                >
                                    {edu.graduationDate}
                                </Typography>
                            </Box>
                            <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                    color: '#3498db',
                                    fontWeight: 600,
                                    fontSize: '0.95rem'
                                }}
                            >
                                {edu.school} • {edu.location}
                            </Typography>
                            {edu.gpa && (
                                <Typography 
                                    variant="body2"
                                    sx={{
                                        color: '#2c3e50',
                                        mt: 0.5,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    GPA: {edu.gpa}
                                </Typography>
                            )}
                            {edu.description && (
                                <Typography 
                                    variant="body2"
                                    sx={{
                                        color: '#2c3e50',
                                        mt: 0.5,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {edu.description}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </ResumeSection>
            )}

            {renderSkills()}

            {/* Projects */}
            {projects.length > 0 && (
                <ResumeSection>
                    <SectionTitle variant="h6">Projects</SectionTitle>
                    {projects.map((project, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: '#2c3e50',
                                    fontSize: '1rem',
                                    mb: 0.5
                                }}
                            >
                                {project.title}
                            </Typography>
                            <Typography 
                                variant="body2"
                                sx={{
                                    color: '#2c3e50',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6
                                }}
                            >
                                {project.description}
                            </Typography>
                        </Box>
                    ))}
                </ResumeSection>
            )}
        </Paper>
    );
};

export default ProfessionalTemplate; 