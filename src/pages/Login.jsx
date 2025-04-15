import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const navigate = useNavigate();

  const defaultEmail = 'tamizhs@files.com';
  const defaultPassword = '1416';

  const handleLogin = () => {
    if (email === defaultEmail && password === defaultPassword) {
      // Redirect or show success message
      navigate("/Home")
      localStorage.setItem("user", JSON.stringify("zghshsuhjsbjdgjhksjkshkj"));

    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignUp = () => {
    setSignUpMessage('You are not authenticated to access this page');
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(45deg, #ff0000, #000000)', // Red and Black gradient
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(0, 0, 0, 0.6)', // Glassmorphism effect
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          width: '100%',
          backdropFilter: 'blur(10px)', // Glassmorphism effect
          border: '1px solid rgba(255, 255, 255, 0.1)',
          
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2, color: '#fff' }}>
        Your gateway to simplicity and efficiency
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 4, color: '#ccc' }}>
          Please login to your account
        </Typography>

        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 4 }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff' },
            }}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '12px', fontWeight: 'bold' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2, color: '#fff' }}>
          Don't have an account?{' '}
          <Button
            color="primary"
            sx={{ textTransform: 'none', color: '#fff' }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Typography>

        {signUpMessage && (
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: '#ff0000',
              marginTop: 4,
              fontWeight: 'bold',
            }}
          >
            {signUpMessage}
          </Typography>
        )}

        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontSize: '14px',
            color: '#888',
          }}
        >
         
        </Box>
        
      </motion.div>
     
      
    </Container>
  );
};

export default LoginPage;
