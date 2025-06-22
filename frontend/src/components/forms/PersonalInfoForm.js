import React from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    Box
} from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    Language as WebsiteIcon,
    LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const PersonalInfoForm = ({ data, onChange }) => {
    const handleChange = (field) => (event) => {
        onChange({
            ...data,
            [field]: event.target.value
        });
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="First Name"
                        value={data.firstName || ''}
                        onChange={handleChange('firstName')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Last Name"
                        value={data.lastName || ''}
                        onChange={handleChange('lastName')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Professional Summary"
                        value={data.summary || ''}
                        onChange={handleChange('summary')}
                        helperText="Write a brief summary of your professional background and goals"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={data.email || ''}
                        onChange={handleChange('email')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={data.phone || ''}
                        onChange={handleChange('phone')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="LinkedIn Profile"
                        value={data.linkedin || ''}
                        onChange={handleChange('linkedin')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LinkedInIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Website"
                        value={data.website || ''}
                        onChange={handleChange('website')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <WebsiteIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfoForm; 