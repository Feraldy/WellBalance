import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const DrinkWidget = () => {
  const [timeLeft, setTimeLeft] = useState(120 * 60); 
  const [isRunning, setIsRunning] = useState(true);
  const [isNeedDrink, setIsNeedDrink] = useState(true); 

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } 
    else {
        setIsNeedDrink(true)
    }
  }, [timeLeft, isRunning, isNeedDrink]);

  return (
    <Box
      sx={{
        p:5,
        borderRadius: 7,
        boxShadow: 3,
        textAlign: 'center',
        bgcolor: '#AAE3E9',
        color: '#212121',
        flexGrow: 1
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <LocalDrinkIcon sx={{ scale:1.2, p:0.6, color:"white", backgroundColor:"#212121", borderRadius:10}} ></LocalDrinkIcon>
        </Stack>
      </Stack>
      {isNeedDrink? (
        <Stack alignItems="flex-start" pt="2.5rem">
            <Typography fontSize="2rem" align='left'>
                It's time to <strong>drink!</strong>
            </Typography>
            <Stack onClick={() => {setTimeLeft(120 * 60); setIsNeedDrink(false);}} sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer" } }}>
                <Typography fontSize="1rem" fontWeight="400" pt="2.5rem" align="left">
                    I already drink!
                </Typography>
                <ArrowRightAltIcon sx={{scale:"1.2"}}></ArrowRightAltIcon>
            </Stack>
        </Stack>
        
      ):(
        <Stack alignItems="flex-start" pt="2rem">
        <Typography fontSize="1.5rem" align='left'>
          Drinking <br/>
          <strong>water</strong><br/>
          can make<br/>
          you more<br/>
          <strong>focus</strong>
        </Typography>
      </Stack>
      )}
      
    </Box>
  );
};

export default DrinkWidget;
