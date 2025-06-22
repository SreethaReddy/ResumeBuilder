import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';

// Components
import Navbar from './components/layout/Navbar';

// Context
import { AuthProvider } from './context/AuthContext';

// Auth Guard
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#2c3e50',
            light: '#34495e',
        },
        secondary: {
            main: '#3498db',
        },
        background: {
            default: '#f5f6fa',
        },
    },
    typography: {
        fontFamily: '"Calibri", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                    <AuthProvider>
                        <Navbar />
                        <Box sx={{ pt: 8 }}>  {/* Add padding top to account for fixed navbar */}
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route 
                                    path="/dashboard" 
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route 
                                    path="/resume/build" 
                                    element={
                                        <PrivateRoute>
                                            <ResumeBuilder />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route 
                                    path="/resume/preview/:id" 
                                    element={
                                        <PrivateRoute>
                                            <ResumePreview />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </Box>
                    </AuthProvider>
                </Box>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App; 