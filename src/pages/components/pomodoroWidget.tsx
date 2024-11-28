import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Icon } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import InfoIcon from '@mui/icons-material/Info';

const PomodoroWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState('Work'); 
  const [shortBreakCount, setShortBreakCount] =  useState(0)

  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      if(mode==='Work' && shortBreakCount === 4 ){
        handleTime("Long Break")
      }
      else if(mode==='Work' && shortBreakCount < 4){
        handleTime("Short Break")
      }
      else{
        handleTime("Work")
      }
    } 
  }, [timeLeft,isRunning, mode]);

  function handleTime(mode:string) {
    setMode(mode);

    if(mode==="Short Break"){
      setTimeLeft(5*60)
      setShortBreakCount(prevCount => prevCount + 1);
    } else if (mode==="Long Break"){
      setTimeLeft(15*60)
      setShortBreakCount(0)
    }
    else(
      setTimeLeft(25*60)
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
          <TimerIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></TimerIcon>
          <Typography sx={{ pl:2, pr:2, pt:0.5, pb:0.5, color:"white", backgroundColor:"#212121", borderRadius:10, fontSize: "0.8rem", fontWeight:"600"}}>{mode}</Typography>
        </Stack>
        <InfoIcon sx={{ alignSelf:"flex-end", scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></InfoIcon>
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
        <Typography align="left" fontSize="1rem" fontWeight="400" whiteSpace="break-spaces">
          Minutes left until your <br/>
          work
        </Typography>
        {mode==="Work" && (
          <Stack onClick={() => handleTime(shortBreakCount===4 ? "Long Break" : "Short Break")} sx={{ 
            "&:hover": { 
              textDecoration: "underline", 
              cursor: "pointer" 
            } 
          }}>
            <Typography fontSize="1rem" fontWeight="400" pt="1.5rem">
              I need a break!
            </Typography>
            <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
            </Stack>
        )}
        {(mode==="Long Break" || mode==="Short Break") && (
          <Stack onClick={() => handleTime("Work")} sx={{ 
            "&:hover": { 
              textDecoration: "underline", 
              cursor: "pointer" 
            } 
          }}>
            <Typography fontSize="1rem" fontWeight="400" pt="1.5rem">
              Let's Work!
            </Typography>
            <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
            </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default PomodoroWidget;
