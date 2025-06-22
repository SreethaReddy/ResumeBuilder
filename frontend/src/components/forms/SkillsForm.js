import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const SkillsForm = ({ data = [], onChange }) => {
    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState([]);
    const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
    const [newSoftSkill, setNewSoftSkill] = useState('');

    useEffect(() => {
        // Initialize skills from props
        const techSkills = data.filter(skill => skill.includes('(Technical)')).map(skill => skill.replace(' (Technical)', ''));
        const softSkills = data.filter(skill => skill.includes('(Soft)')).map(skill => skill.replace(' (Soft)', ''));
        setTechnicalSkills(techSkills);
        setSoftSkills(softSkills);
    }, [data]);

    const handleAddTechnicalSkill = () => {
        if (newTechnicalSkill.trim()) {
            const updatedSkills = [...technicalSkills, newTechnicalSkill.trim()];
            setTechnicalSkills(updatedSkills);
            setNewTechnicalSkill('');
            const allSkills = [
                ...updatedSkills.map(skill => `${skill} (Technical)`),
                ...softSkills.map(skill => `${skill} (Soft)`)
            ];
            onChange(allSkills);
        }
    };

    const handleAddSoftSkill = () => {
        if (newSoftSkill.trim()) {
            const updatedSkills = [...softSkills, newSoftSkill.trim()];
            setSoftSkills(updatedSkills);
            setNewSoftSkill('');
            const allSkills = [
                ...technicalSkills.map(skill => `${skill} (Technical)`),
                ...updatedSkills.map(skill => `${skill} (Soft)`)
            ];
            onChange(allSkills);
        }
    };

    const handleRemoveTechnicalSkill = (index) => {
        const updatedSkills = technicalSkills.filter((_, i) => i !== index);
        setTechnicalSkills(updatedSkills);
        const allSkills = [
            ...updatedSkills.map(skill => `${skill} (Technical)`),
            ...softSkills.map(skill => `${skill} (Soft)`)
        ];
        onChange(allSkills);
    };

    const handleRemoveSoftSkill = (index) => {
        const updatedSkills = softSkills.filter((_, i) => i !== index);
        setSoftSkills(updatedSkills);
        const allSkills = [
            ...technicalSkills.map(skill => `${skill} (Technical)`),
            ...updatedSkills.map(skill => `${skill} (Soft)`)
        ];
        onChange(allSkills);
    };

    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Technical Skills
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Add Technical Skill"
                        value={newTechnicalSkill}
                        onChange={(e) => setNewTechnicalSkill(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTechnicalSkill();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddTechnicalSkill}
                        disabled={!newTechnicalSkill.trim()}
                    >
                        Add
                    </Button>
                </Box>
                <List>
                    {technicalSkills.map((skill, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={skill} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleRemoveTechnicalSkill(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Soft Skills
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Add Soft Skill"
                        value={newSoftSkill}
                        onChange={(e) => setNewSoftSkill(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddSoftSkill();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddSoftSkill}
                        disabled={!newSoftSkill.trim()}
                    >
                        Add
                    </Button>
                </Box>
                <List>
                    {softSkills.map((skill, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={skill} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleRemoveSoftSkill(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default SkillsForm; 