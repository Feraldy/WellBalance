import React, { useState, useEffect } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import localforage from 'localforage';
import EditNoteIcon from '@mui/icons-material/EditNote';

const NoteWidget = () => {
    const [note, setNote] = useState([]);

    useEffect(() => {
        localforage.getItem('note').then((savedNotes) => {
          if (savedNotes) {
            setNote(savedNotes);
          }
        });
      }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localforage.setItem('note', note);
          }, 500); 
        return () => clearTimeout(timer); 
      }, [note]);

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
                    <EditNoteIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></EditNoteIcon>
                </Stack>
            </Stack>
            <TextField
                variant="outlined"
                multiline
                rows={8}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your notes here..."
                sx={{ mb: 2, pt: "1.5rem", 
                        '& .MuiInputBase-root': { 
                            border: 'none', 
                            borderRadius: '1.15rem',
                        }, 
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        }, 
                    }}
            />
        </Box>
      );
    };
    
    export default NoteWidget;
