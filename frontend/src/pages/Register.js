import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Alert
} from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing again
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        const requestPayload = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        try {
            console.log('Sending registration request with payload:', requestPayload);
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                // Store the token and user info
                localStorage.setItem('token', data.token);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                navigate('/dashboard');
            } else {
                // Handle different types of error responses
                if (data.errors && Array.isArray(data.errors)) {
                    // Join multiple validation errors
                    setError(data.errors.map(err => err.msg || err.message).join(', '));
                } else if (data.error) {
                    setError(data.error);
                } else if (data.message) {
                    setError(data.message);
                } else {
                    setError('Registration failed. Please try again.');
                }
                console.error('Server error details:', data);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error or server is not responding. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create Account
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                    Start building your professional resume
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!error && !formData.name}
                        helperText={error && !formData.name ? 'Name is required' : ''}
                        inputProps={{ minLength: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!error && !formData.email}
                        helperText={error && !formData.email ? 'Valid email is required' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!error && (!formData.password || formData.password.length < 6)}
                        helperText={
                            error && !formData.password 
                                ? 'Password is required' 
                                : 'Password must be at least 6 characters'
                        }
                        inputProps={{ minLength: 6 }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!error && formData.password !== formData.confirmPassword}
                        helperText={error && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register; 