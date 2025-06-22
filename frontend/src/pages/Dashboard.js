import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    CircularProgress,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Preview as PreviewIcon
} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

const Dashboard = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedResume, setSelectedResume] = useState(null);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/resumes', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setResumes(data);
            } else {
                throw new Error('Failed to fetch resumes');
            }
        } catch (error) {
            setError('Failed to load resumes');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        navigate('/resume/build');
    };

    const handleMenuClick = (event, resume) => {
        setAnchorEl(event.currentTarget);
        setSelectedResume(resume);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedResume(null);
    };

    const handlePreview = (resumeId) => {
        if (resumeId) {
            navigate(`/resume/preview/${resumeId}`);
        }
    };

    const handleEdit = (resumeId) => {
        navigate(`/resume/build?edit=${resumeId}`);
    };

    const handleDelete = async (resumeId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/resumes/${resumeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setResumes(resumes.filter(resume => resume._id !== resumeId));
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
        handleMenuClose();
    };

    const handleDownload = () => {
        if (selectedResume) {
            // Implement download functionality
            handleMenuClose();
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Resumes
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/resume/build')}
                >
                    Create New Resume
                </Button>
            </Box>

            {error ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="error">{error}</Typography>
                </Paper>
            ) : resumes.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Resumes Yet
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Create your first resume to get started
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateNew}
                    >
                        Create Resume
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {resumes.map((resume) => (
                        <Grid item xs={12} sm={6} md={4} key={resume._id}>
                            <Paper
                                sx={{
                                    p: 0,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                                    '&:hover': {
                                        boxShadow: 8,
                                        transform: 'translateY(-6px) scale(1.03)',
                                    },
                                }}
                            >
                                {/* Accent bar */}
                                <Box sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 8,
                                    bgcolor: 'primary.main',
                                }} />
                                <Box sx={{ p: 3, pl: 5 }}>
                                    {/* Avatar/Initials */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            bgcolor: deepPurple[500],
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: 20,
                                            mr: 2,
                                            boxShadow: 1,
                                        }}>
                                            {resume.firstName?.[0]}{resume.lastName?.[0]}
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
                                                {resume.firstName} {resume.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                                {resume.template || 'Professional'} Template
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <Button
                                            startIcon={<PreviewIcon />}
                                            onClick={() => handlePreview(resume._id)}
                                            variant="contained"
                                            sx={{
                                                bgcolor: 'linear-gradient(90deg, #5e60ce 0%, #48bfe3 100%)',
                                                color: '#fff',
                                                fontWeight: 700,
                                                borderRadius: 2,
                                                px: 3,
                                                py: 1,
                                                boxShadow: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    bgcolor: 'linear-gradient(90deg, #48bfe3 0%, #5e60ce 100%)',
                                                    boxShadow: 4,
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                        >
                                            Preview
                                        </Button>
                                        <IconButton
                                            onClick={(e) => handleMenuClick(e, resume)}
                                            size="small"
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleEdit(selectedResume?._id)}>
                    <EditIcon sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => handleDelete(selectedResume?._id)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default Dashboard; 