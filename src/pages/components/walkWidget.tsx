import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface WalkWidgetProps{
    walkDuration:number
    setWalkDuration: ( walkDuration:number) => void
    walkInterval:number
    setWalkInterval: ( walkInterval:number) => void
}

const WalkWidget: React.FC<WalkWidgetProps> = ({walkDuration, setWalkDuration, walkInterval, setWalkInterval}) => {
    const [timeLeft, setTimeLeft] = useState(walkInterval*60); 
    const [isRunning, setIsRunning] = useState(true);
    const [mode, setMode] = useState('Work'); 


    useEffect(() => {
        localforage.getItem('walkInterval').then((savedInterval) => {
        if (savedInterval) {
            setWalkInterval(savedInterval);
            setTimeLeft(savedInterval*60)
        }
        });
        localforage.getItem('walkDuration').then((savedDuration) => {
            if (savedDuration) {
                setWalkDuration(savedDuration);
            }
        });
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            if(mode==='Work' ){
                handleTime("Walk")
              }
              else{
                handleTime("Work")
            }
        } 
    }, [timeLeft, isRunning, mode]);

    const formatTime = (seconds:number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    function handleTime(mode:string) {
        setMode(mode);

        if(mode==="Walk"){
            setTimeLeft(walkDuration*60)
        }
        else(
            setTimeLeft(walkInterval*60)
        )
    } 

    return (
        <Box
        sx={{
            p:5,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            bgcolor: '#D9D9D9',
            color: '#212121',
            flexGrow: 1
        }}
        >
        <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack direction="row" spacing={1.5} alignItems="center">
            <DirectionsRunIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></DirectionsRunIcon>
            <Typography sx={{ pl:2, pr:2, pt:0.5, pb:0.5, color:"white", backgroundColor:"#212121", borderRadius:10, fontSize: "0.8rem", fontWeight:"600"}}>{mode}</Typography>
            </Stack>
        </Stack>
        <Stack alignItems="flex-start" pt="1.4rem">
            {isRunning? (
                <Typography fontSize="1rem" fontWeight="400" onClick={() => setIsRunning(false)} sx={{ 
                "&:hover": { 
                    textDecoration: "underline", 
                    cursor: "pointer" 
                } 
                }}>
                Pause  
                </Typography>
            ) : (
                <Typography fontSize="1rem" fontWeight="400" onClick={() => setIsRunning(true)} sx={{ 
                "&:hover": { 
                    textDecoration: "underline", 
                    cursor: "pointer" 
                } 
                }}>
                Start 
                </Typography>
            )}
            <Typography fontSize="2.5rem" fontWeight="700">
            {formatTime(timeLeft)}
            </Typography>
            
            {mode==="Work" && (
                <Stack>
                    <Typography align="left" fontSize="1rem" fontWeight="400" whiteSpace="break-spaces">
                        Minutes left until your <br/>
                        next walk
                    </Typography>
                    <Stack onClick={() => handleTime("Walk")} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                        <Typography fontSize="1rem" fontWeight="400" pt="1.5rem" align="left">
                            I will walk now!
                        </Typography>
                        <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                    </Stack>
                </Stack>
            )}
            {mode==="Walk" && (
                <Stack>
                    <Typography align="left" fontSize="1rem" fontWeight="400" whiteSpace="break-spaces">
                        Minutes left, keep the spirit!
                    </Typography>
                    <Stack onClick={() => handleTime("Work")} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                        <Typography fontSize="1rem" fontWeight="400" pt="1.5rem" align="left">
                            I'm tired!
                        </Typography>
                        <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                    </Stack>
                </Stack>
            )}
        </Stack>
        </Box>
        );
    };

export default WalkWidget;
