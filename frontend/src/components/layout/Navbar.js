import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    Description as DescriptionIcon,
    Add as AddIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    component={RouterLink}
                    to={user ? "/dashboard" : "/"}
                    sx={{ mr: 2 }}
                >
                    <DescriptionIcon />
                </IconButton>
                
                <Typography 
                    variant="h6" 
                    component={RouterLink} 
                    to={user ? "/dashboard" : "/"}
                    sx={{ 
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    Resume Builder
                </Typography>

                <Box>
                    {user ? (
                        <>
                            <Button
                                color="inherit"
                                startIcon={<AddIcon />}
                                component={RouterLink}
                                to="/resume/build"
                                sx={{ mr: 2 }}
                            >
                                New Resume
                            </Button>
                            
                            <IconButton
                                color="inherit"
                                onClick={handleLogout}
                                title="Logout"
                            >
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                startIcon={<LoginIcon />}
                                component={RouterLink}
                                to="/login"
                                sx={{ mr: 2 }}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<PersonAddIcon />}
                                component={RouterLink}
                                to="/register"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 