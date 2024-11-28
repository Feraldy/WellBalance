import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface HeaderProps{
    name:string
}

const quotes = [
    { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { content: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Albert Schweitzer' },
    { content: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
    { content: 'Dream big and dare to fail.', author: 'Norman Vaughan' },
  ];

const Header: React.FC<HeaderProps> = ({name}) => {
    const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
          const currentHour = new Date().getHours();
          if (currentHour < 12) {
            setGreeting('Good Morning');
          } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
          } else {
            setGreeting('Good Evening');
          }
        };
      
        updateGreeting();
        const interval = setInterval(updateGreeting, 3600000); 
        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }, []);

    return(
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
            <Stack direction="row" justifyContent="space-between">
            <Stack>
                <Typography fontSize="2rem" fontWeight="200"> {greeting}, </Typography>
                <Typography fontSize="2rem" align="left"> {name.split(' ')[0]} </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" >
                <Stack sx={{pr:"1rem"}}>
                    <Typography fontSize="1.5rem" fontWeight="400" align="right">
                        "{quote?.content}"
                    </Typography>
                    <Typography fontSize="1.5rem" fontWeight="200" align="right">
                        - {quote?.author}
                    </Typography>
                </Stack>
            </Stack>  
            </Stack>
        </Box>
    )
}

export default Header;


