import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import { db } from '../firebase'; // Import Firebase db
import { collection, addDoc, getDocs } from 'firebase/firestore';

const randomColors = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#009688', '#4CAF50', '#FF9800', '#795548'];

const Home = () => {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading animation
  const navigate = useNavigate();

  // Fetch folders from Firestore
  useEffect(() => {
    const fetchFolders = async () => {
      const querySnapshot = await getDocs(collection(db, 'folders'));
      const foldersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFolders(foldersData);
    };
    fetchFolders();
  }, []);

  const handleAddFolder = async () => {
    if (!newFolder.trim()) return;  // Prevent empty folder name
    setIsLoading(true);  // Start loading animation
    
    const folder = {
      name: newFolder,
      color: randomColors[Math.floor(Math.random() * randomColors.length)],
    };

    try {
      // Add folder to Firebase Firestore
      const docRef = await addDoc(collection(db, 'folders'), folder);
      setFolders([...folders, { id: docRef.id, ...folder }]);
      setNewFolder('');  // Reset input field
    } catch (e) {
      console.error("Error adding folder: ", e);
    } finally {
      setIsLoading(false);  // Stop loading animation
    }
  };

  const logout=()=>{
    localStorage.setItem("user", JSON.stringify("zghshsuhdjiuettrdgjhksjkshkj"));
    
    navigate("/");
  }

  return (
    <Box p={2} sx={{ minHeight: '100vh', background: '#e0f7fa',width:"100vw" }}>
      <Typography variant="h5" mb={2} fontWeight="bold"  sx={{color:"rgb(232, 0, 0)",display:"flex",justifyContent:"space-between"}}>
       <Typography> 📁 Tasks Folders</Typography>

        <Button
         onClick={logout} 
        >
            logout
     
        </Button>
      </Typography>

      <Box display="flex" gap={1} mb={2} justifyContent="center" sx={{ width: '100%' }}>
        <TextField
          label="Folder Name"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value.toLocaleUpperCase())}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleAddFolder}
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <Add />}
          disabled={isLoading}  // Disable button while loading
        >
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="start">
        {folders.map((folder) => (
          <Grid item xs={6} sm={4} md={3} key={folder.id}>
            <Card
              onClick={() => navigate(`/folder/${folder.id}`, { state: folder })}
              sx={{
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
              }}
            >
              <CardContent>
                <Box textAlign="center">
                  <Typography variant="subtitle1" fontWeight="bold" color={folder.color}>
                    {folder.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
