import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, IconButton, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { ArrowBack, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const FolderPage = () => {
  const { state: folder } = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'folders', folder.id, 'tasks'));
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    };
    fetchTasks();
  }, [folder.id]);

  const addTask = async () => {
    if (!taskInput.trim()) return;
    setIsLoading(true);
    const newTask = { title: taskInput, completed: false };
    try {
      const docRef = await addDoc(collection(db, 'folders', folder.id, 'tasks'), newTask);
      setTasks([...tasks, { id: docRef.id, ...newTask }]);
      setTaskInput('');
    } catch (e) {
      console.error("Error adding task: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };
    try {
      const taskDocRef = doc(db, 'folders', folder.id, 'tasks', id);
      await updateDoc(taskDocRef, updatedTask);
      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (e) {
      console.error("Error updating task: ", e);
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskDocRef = doc(db, 'folders', folder.id, 'tasks', id);
      await deleteDoc(taskDocRef);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (e) {
      console.error("Error deleting task: ", e);
    }
  };

  const deleteFolder = async () => {
    try {
      // Delete all tasks under the folder
      const tasksQuerySnapshot = await getDocs(collection(db, 'folders', folder.id, 'tasks'));
      tasksQuerySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'folders', folder.id, 'tasks', docSnapshot.id));
      });

      // Delete the folder itself
      await deleteDoc(doc(db, 'folders', folder.id));
      navigate('/Home');
    } catch (e) {
      console.error("Error deleting folder: ", e);
    }
  };

  return (
    <Box p={2} sx={{ minHeight: '100vh', background: '#f3e5f5',width:"100vw" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
        <Typography variant="h6" fontWeight="bold" color={folder.color}>
          {folder.name} Tasks
        </Typography>
        <IconButton onClick={deleteFolder} sx={{ marginLeft: 'auto' }}><Delete color="error" /></IconButton>
      </Box>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="New Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value.toLocaleUpperCase())}
          fullWidth
          size="small"
        />
        <Button variant="contained" onClick={addTask} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add'}
        </Button>
      </Box>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              mb: 1,
            }}
            secondaryAction={
              <>
                <IconButton onClick={() => toggleTask(task.id)} sx={{color:"red"}}>
                  {task.completed ? <CheckCircle color="success" /> : <RadioButtonUnchecked />}
                </IconButton>
                <IconButton onClick={() => deleteTask(task.id)}><Delete /></IconButton>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none' ,color:'rgb(3, 3, 3)'}}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FolderPage;
