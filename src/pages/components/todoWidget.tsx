import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import localforage from 'localforage';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Todo {
    text: string;
    completed: boolean;
}

const ToDoWidget: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        localforage.getItem<Todo[]>('todos').then((savedTodos) => {
          if (savedTodos) {
            setTodos(savedTodos);
          }
        });
      }, []);

    const saveTodos = (updatedTodos: Todo[]) => {
        setTodos(updatedTodos);
        localforage.setItem('todos', updatedTodos);
    };

    const handleAddTodo = () => {
        if (newTodo.trim()) {
          const updatedTodos = [...todos, { text: newTodo, completed: false }];
          saveTodos(updatedTodos);
          setNewTodo('');
          setIsAdding(false);
        }
    };

    const toggleComplete = (index:number) => {
        const updatedTodos = todos.map((todo, idx) =>
          idx === index ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos(updatedTodos);
    };

    const clearTodos = () => {
        saveTodos([]);
    };

    return (
        <Box
        sx={{
            p:5,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            bgcolor: '#D9D9D9',
            color: '#212121',
            flexGrow: 2
          }}
        >
        <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack direction="row" spacing={1.5} alignItems="center">
                <FormatListBulletedIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></FormatListBulletedIcon>
            </Stack>
            <DeleteForeverIcon onClick={() => clearTodos()} sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10, "&:hover": { textDecoration: "underline", cursor: "pointer" }}} ></DeleteForeverIcon>
        </Stack>
        
        {!isAdding ? (
            <Stack>
                <List sx={{ pt: '1.5rem' }}>
                    {todos.map((todo, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        onClick={() => toggleComplete(index)}
                        sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        cursor: 'pointer',
                        }}
                    >
                        {todo.completed? (
                            <CircleIcon sx={{scale: "0.5"}}></CircleIcon>
                        ): (
                            <RadioButtonUncheckedIcon sx={{scale: "0.5"}}></RadioButtonUncheckedIcon>

                        )}
                        <ListItemText primary={todo.text} primaryTypographyProps={{fontSize: '1.5rem'}} />
                    </ListItem>
                    ))}
                </List>
                <Stack onClick={() => setIsAdding(true)} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                <Typography fontSize="1rem" fontWeight="400" pt="1.5rem" align="left">
                    Add new to-do!
                </Typography>
                <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                </Stack>
            </Stack>
          ) : (
            <Stack spacing={2} pt="1.5rem">
                <Typography align='left' fontSize='1.3rem'>I need to...</Typography>
                <TextField
                    sx={{ 
                        '& .MuiInputBase-root': { 
                            border: 'none', 
                            backgroundColor: '#212121',
                            borderRadius: '1.15rem',
                            color: 'white'
                        }                       
                    }} 
                    variant="outlined"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <Stack onClick={handleAddTodo} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                    <Typography fontSize="1rem" fontWeight="400" pt="0.5rem" align="left">
                        Add this new to-do
                    </Typography>
                    <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                </Stack>
            </Stack>
          )}
        </Box>
      );
    };
    
    export default ToDoWidget;

