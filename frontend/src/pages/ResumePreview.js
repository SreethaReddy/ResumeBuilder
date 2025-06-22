import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Button, 
    CircularProgress,
    Paper,
    Alert,
    Snackbar,
    IconButton
} from '@mui/material';
import { 
    PictureAsPdf as PdfIcon,
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';

const templates = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate
};

// Cache for resume data
const resumeCache = new Map();

const ResumePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const resumeRef = useRef(null);
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const fetchResumeData = useCallback(async () => {
        // Check cache first
        if (resumeCache.has(id)) {
            setResumeData(resumeCache.get(id));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/resumes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setResumeData(data);
                // Cache the data
                resumeCache.set(id, data);
            } else {
                throw new Error('Failed to fetch resume data');
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
            setError('Failed to load resume. Please try again.');
            showSnackbar('Failed to load resume', 'error');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchResumeData();
    }, [fetchResumeData]);

    const downloadPDF = async () => {
        if (!resumeRef.current) return;

        setPdfLoading(true);
        try {
            // Create a canvas from the resume content
            const canvas = await html2canvas(resumeRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FFFFFF',
                removeContainer: true // Optimize memory usage
            });

            // Convert canvas to PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4',
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            // Generate filename from user's name
            const fileName = resumeData?.firstName && resumeData?.lastName 
                ? `${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`
                : 'resume.pdf';
            
            pdf.save(fileName);
            showSnackbar('PDF downloaded successfully');
        } catch (error) {
            console.error('Error generating PDF:', error);
            showSnackbar('Failed to generate PDF', 'error');
        } finally {
            setPdfLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/resume/build?edit=${id}`);
    };

    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </Button>
            </Container>
        );
    }

    const SelectedTemplate = templates[resumeData.template || 'professional'];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </Button>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                >
                    Edit Resume
                </Button>
                <Button
                    variant="contained"
                    startIcon={pdfLoading ? <CircularProgress size={20} color="inherit" /> : <PdfIcon />}
                    onClick={downloadPDF}
                    disabled={pdfLoading}
                >
                    {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
            </Box>

            <Paper 
                elevation={3}
                sx={{ 
                    p: 0,
                    overflow: 'hidden',
                    '@media print': {
                        boxShadow: 'none'
                    }
                }}
            >
                <Box ref={resumeRef}>
                    <SelectedTemplate data={resumeData} />
                </Box>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => setSnackbar({ ...snackbar, open: false })}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ResumePreview; 