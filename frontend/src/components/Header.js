import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from '@mui/material';

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        // Listen for custom authChange event and storage changes
        const onAuthChange = () => setIsAuthenticated(!!localStorage.getItem('token'));
        window.addEventListener('authChange', onAuthChange);
        window.addEventListener('storage', onAuthChange);
        return () => {
            window.removeEventListener('authChange', onAuthChange);
            window.removeEventListener('storage', onAuthChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Resume Builder
                </Typography>
                <Box>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 