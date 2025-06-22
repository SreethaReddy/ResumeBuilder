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

const ProjectsForm = ({ data = [], onChange }) => {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                name: '',
                description: '',
                highlights: '',
                technologies: '',
                link: ''
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
                    No projects added. Click below to add your first project.
                </Typography>
            ) : (
                data.map((project, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        {index > 0 && <Divider sx={{ my: 4 }} />}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Typography variant="h6">Project {index + 1}</Typography>
                            <IconButton onClick={() => handleRemove(index)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Project Name"
                                    value={project.name || ''}
                                    onChange={handleChange(index, 'name')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Project Description"
                                    value={project.description || ''}
                                    onChange={handleChange(index, 'description')}
                                    multiline
                                    rows={2}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Key Highlights"
                                    value={project.highlights || ''}
                                    onChange={handleChange(index, 'highlights')}
                                    multiline
                                    rows={4}
                                    helperText="Enter each highlight on a new line"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Technologies Used"
                                    value={project.technologies || ''}
                                    onChange={handleChange(index, 'technologies')}
                                    placeholder="e.g., React, Node.js, MongoDB"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Project Link"
                                    value={project.link || ''}
                                    onChange={handleChange(index, 'link')}
                                    placeholder="e.g., GitHub repository or live demo"
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
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectsForm; 