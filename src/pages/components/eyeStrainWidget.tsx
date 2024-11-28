import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


const EyeStrainWidget = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); 
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState('Work'); 

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
      if(mode==='Work' ){
        handleTime("Break")
      }
      else{
        handleTime("Work")
      }
    } 
  }, [timeLeft,isRunning, mode]);

  function handleTime(mode:string) {
    setMode(mode);

    if(mode==="Break"){
      setTimeLeft(20)
    } 
    else(
      setTimeLeft(20*60)
    )
  } 
      
  return (
    <Box
      sx={{
        p:5,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        bgcolor: '#ABE6D1',
        color: '#212121',
        flexGrow: 1
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <RemoveRedEyeIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></RemoveRedEyeIcon>
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
        
        {mode==="Work" && (
            <Stack>
                <Typography align="left" fontSize="1rem" fontWeight="400" whiteSpace="break-spaces">
                    Minutes left until your <br/>
                    eyes need rest
                </Typography>
                <Stack onClick={() => handleTime("Break")} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                    <Typography fontSize="1rem" fontWeight="400" pt="1.5rem" align="left">
                        My eyes need a break!
                    </Typography>
                    <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                </Stack>
            </Stack>
        )}
        {mode==="Break" && (
            <Stack>
                <Typography align="left" fontSize="1rem" fontWeight="400" whiteSpace="break-spaces">
                    Focus your eyes <br/>
                    on something <br/>
                    20 feet away
                </Typography>
                <Stack onClick={() => handleTime("Break")} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                    <Typography fontSize="1rem" fontWeight="400" pt="1.5rem" align="left">
                        Start Looking!
                    </Typography>
                    <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
                </Stack>
            </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default EyeStrainWidget;
