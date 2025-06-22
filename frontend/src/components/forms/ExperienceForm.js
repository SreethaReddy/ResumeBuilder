import React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    IconButton,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ExperienceForm = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                achievements: ''
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
            [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        };

        if (field === 'current' && event.target.checked) {
            newData[index].endDate = '';
        }

        onChange(newData);
    };

    return (
        <Box>
            {data.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
                    No work experience added. Click below to add your first position.
                </Typography>
            ) : (
                data.map((experience, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        {index > 0 && <Divider sx={{ my: 4 }} />}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Typography variant="h6">Position {index + 1}</Typography>
                            <IconButton onClick={() => handleRemove(index)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company"
                                    value={experience.company || ''}
                                    onChange={handleChange(index, 'company')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    value={experience.position || ''}
                                    onChange={handleChange(index, 'position')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    value={experience.location || ''}
                                    onChange={handleChange(index, 'location')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    value={experience.startDate || ''}
                                    onChange={handleChange(index, 'startDate')}
                                    placeholder="e.g., Jun 2020"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="End Date"
                                    value={experience.endDate || ''}
                                    onChange={handleChange(index, 'endDate')}
                                    placeholder="e.g., Present"
                                    disabled={experience.current}
                                    required={!experience.current}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={experience.current || false}
                                            onChange={handleChange(index, 'current')}
                                        />
                                    }
                                    label="I currently work here"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={experience.description || ''}
                                    onChange={handleChange(index, 'description')}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Key Achievements"
                                    value={experience.achievements || ''}
                                    onChange={handleChange(index, 'achievements')}
                                    multiline
                                    rows={4}
                                    helperText="Enter each achievement on a new line"
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
                Add Work Experience
            </Button>
        </Box>
    );
};

export default ExperienceForm; 