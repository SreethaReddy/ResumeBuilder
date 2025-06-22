import React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const EducationForm = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                school: '',
                degree: '',
                location: '',
                graduationDate: '',
                gpa: '',
                description: ''
            }
        ]);
    };

    const handleRemove = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleChange = (index, field) => (event) => {
        const newData = [...data];
        newData[index] = {
            ...newData[index],
            [field]: event.target.value
        };
        onChange(newData);
    };

    return (
        <Box>
            {data.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
                    No education added. Click below to add your education.
                </Typography>
            ) : (
                data.map((education, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        {index > 0 && <Divider sx={{ my: 4 }} />}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Typography variant="h6">Education {index + 1}</Typography>
                            <IconButton onClick={() => handleRemove(index)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="School/University"
                                    value={education.school || ''}
                                    onChange={handleChange(index, 'school')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Degree"
                                    value={education.degree || ''}
                                    onChange={handleChange(index, 'degree')}
                                    required
                                    placeholder="e.g., Bachelor of Science in Computer Science"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    value={education.location || ''}
                                    onChange={handleChange(index, 'location')}
                                    placeholder="e.g., New York, NY"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Graduation Date"
                                    value={education.graduationDate || ''}
                                    onChange={handleChange(index, 'graduationDate')}
                                    placeholder="e.g., May 2023"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="GPA"
                                    value={education.gpa || ''}
                                    onChange={handleChange(index, 'gpa')}
                                    placeholder="e.g., 3.8"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Additional Information"
                                    value={education.description || ''}
                                    onChange={handleChange(index, 'description')}
                                    multiline
                                    rows={3}
                                    helperText="Add relevant coursework, honors, activities, etc."
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))
            )}
            <Button
                startIcon={<AddIcon />}
                onClick={handleAdd}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
            >
                Add Education
            </Button>
        </Box>
    );
};

export default EducationForm; 