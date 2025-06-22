import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    fontFamily: '"Calibri", "Arial", sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    '& .header': {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
        padding: theme.spacing(3),
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        '& h1': {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#2c3e50',
            marginBottom: theme.spacing(1),
            background: 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        '& .contact-info': {
            display: 'flex',
            justifyContent: 'center',
            gap: theme.spacing(2),
            flexWrap: 'wrap',
            color: '#7f8c8d',
            fontSize: '0.9rem',
            '& a': {
                color: '#3498db',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                }
            }
        }
    },
    '& .section': {
        marginBottom: theme.spacing(4),
        '& h2': {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#2c3e50',
            borderBottom: '2px solid #3498db',
            paddingBottom: theme.spacing(1),
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            '&::before': {
                content: '""',
                display: 'inline-block',
                width: '8px',
                height: '8px',
                backgroundColor: '#3498db',
                borderRadius: '50%',
                marginRight: theme.spacing(1),
            }
        }
    },
    '& .experience-item, .education-item': {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        '& .title': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(1),
            '& h3': {
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#2c3e50',
                margin: 0,
            },
            '& .date': {
                color: '#7f8c8d',
                fontSize: '0.9rem',
                backgroundColor: '#e9ecef',
                padding: '2px 8px',
                borderRadius: '4px',
            }
        },
        '& .company, .institution': {
            color: '#3498db',
            fontWeight: 500,
            marginBottom: theme.spacing(1),
        },
        '& .description': {
            color: '#34495e',
            lineHeight: 1.6,
        }
    },
    '& .skills': {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
        '& .skill-category': {
            '& h3': {
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2c3e50',
                marginBottom: theme.spacing(1),
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#3498db',
                    borderRadius: '50%',
                    marginRight: theme.spacing(1),
                }
            },
            '& .skill-list': {
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing(1),
            }
        },
        '& .skill': {
            backgroundColor: '#e9ecef',
            padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
            borderRadius: '15px',
            fontSize: '0.9rem',
            color: '#2c3e50',
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: '#3498db',
                color: '#ffffff',
                transform: 'translateY(-2px)',
            }
        }
    },
    '& .projects': {
        '& .project': {
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2),
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            '& h3': {
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#2c3e50',
                marginBottom: theme.spacing(0.5),
            },
            '& .description': {
                color: '#34495e',
                lineHeight: 1.6,
            }
        }
    }
}));

const ModernTemplate = ({ data }) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        linkedin,
        website,
        summary,
        experience,
        education,
        skills,
        projects
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
                >
                    {website}
                </a>
            );
        }
        return contactItems;
    };

    const renderSkills = () => {
        if (!skills || skills.length === 0) return null;
        // Only use string skills, ignore objects or invalid entries
        const stringSkills = skills.filter(skill => typeof skill === 'string');
        const technicalSkills = stringSkills.filter(skill => skill.endsWith('(Technical)')).map(skill => skill.replace(' (Technical)', ''));
        const softSkills = stringSkills.filter(skill => skill.endsWith('(Soft)')).map(skill => skill.replace(' (Soft)', ''));
        return (
            <Box className="section">
                <Typography variant="h2">Skills</Typography>
                <Box className="skills">
                    {technicalSkills.length > 0 && (
                        <Box className="skill-category">
                            <Typography variant="h3">Technical Skills</Typography>
                            <Box className="skill-list">
                                {technicalSkills.map((skill, index) => (
                                    <Typography key={index} className="skill">
                                        {skill}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {softSkills.length > 0 && (
                        <Box className="skill-category">
                            <Typography variant="h3">Soft Skills</Typography>
                            <Box className="skill-list">
                                {softSkills.map((skill, index) => (
                                    <Typography key={index} className="skill">
                                        {skill}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    };

    return (
        <StyledBox>
            <Box className="header">
                <Typography variant="h1">{firstName} {lastName}</Typography>
                <Box className="contact-info">
                    {renderContactInfo()}
                </Box>
            </Box>

            {summary && (
                <Box className="section">
                    <Typography variant="h2">Summary</Typography>
                    <Typography>{summary}</Typography>
                </Box>
            )}

            {experience && experience.length > 0 && (
                <Box className="section">
                    <Typography variant="h2">Experience</Typography>
                    {experience.map((exp, index) => (
                        <Box key={index} className="experience-item">
                            <Box className="title">
                                <Typography variant="h3">{exp.title}</Typography>
                                <Typography className="date">
                                    {exp.startDate} - {exp.endDate || 'Present'}
                                </Typography>
                            </Box>
                            <Typography className="company">{exp.company}</Typography>
                            <Typography className="description">{exp.description}</Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {education && education.length > 0 && (
                <Box className="section">
                    <Typography variant="h2">Education</Typography>
                    {education.map((edu, index) => (
                        <Box key={index} className="education-item">
                            <Box className="title">
                                <Typography variant="h3">{edu.degree}</Typography>
                                <Typography className="date">
                                    {edu.startDate} - {edu.endDate || 'Present'}
                                </Typography>
                            </Box>
                            <Typography className="institution">{edu.institution}</Typography>
                            {edu.description && (
                                <Typography className="description">{edu.description}</Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {renderSkills()}

            {projects && projects.length > 0 && (
                <Box className="section">
                    <Typography variant="h2">Projects</Typography>
                    {projects.map((project, index) => (
                        <Box key={index} className="project">
                            <Typography variant="h3">{project.title}</Typography>
                            <Typography className="description">{project.description}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </StyledBox>
    );
};

export default ModernTemplate; 