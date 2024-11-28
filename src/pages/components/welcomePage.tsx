import { Box, Stack, TextField, Tooltip, Typography } from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import { useEffect, useState } from "react";
import localforage from "localforage";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TimerIcon from '@mui/icons-material/Timer';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface WelcomePageProps{
    walkDuration:number
    setWalkDuration: ( walkDuration:number) => void
    walkInterval:number
    setWalkInterval: ( walkInterval:number) => void
    isWalkWidget: boolean
    setIsWalkWidget: (isWalkWidget:boolean) => void
    isPomodoroWidget:boolean
    setIsPomodoroWidget: (isPomodoroWidget:boolean) => void
    isTodoWidget:boolean
    setIsTodoWidget: (isTodoWidget:boolean) => void
    isDrinkWidget:boolean
    setIsDrinkWidget: (isDrinkWidget:boolean) => void
    isNoteWidget:boolean
    setIsNoteWidget: (isNoteWidget:boolean) => void
    isEyeWidget:boolean
    setIsEyeWidget: (isEyeWidget:boolean) => void
    isWidgetSetting:boolean
    setIsWidgetSetting: (isWidgetSetting:boolean) => void
    name: string
    setName: (name:string) => void
}

const welcomePage: React.FC<WelcomePageProps> = ({walkDuration, setWalkDuration, walkInterval, setWalkInterval, isWalkWidget, setIsWalkWidget, isPomodoroWidget, setIsPomodoroWidget, isTodoWidget, setIsTodoWidget, isDrinkWidget, setIsDrinkWidget,isNoteWidget, setIsNoteWidget, isEyeWidget, setIsEyeWidget, isWidgetSetting, setIsWidgetSetting, name, setName}) => {
    const [isFirstPage, setIsFirstPage] = useState<boolean | null>(true);
    const [nameSaved, setNameSaved] = useState<boolean>(false);
    const [isWalkSettingDone, setIsWalkSettingDone] = useState<boolean | null>(false);
    const [isWalkSettingProcess, setIsWalkSettingProcess] = useState<boolean | null>(false);

    useEffect(() => {
        localforage.getItem<string>('name').then((savedName) => {
          if (savedName) {
            setName(savedName);
            setNameSaved(true)
          }
        });
        localforage.getItem<boolean>('isWalkWidget').then((boolean) => {
            if (boolean) {
                setIsWalkWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isPomodoroWidget').then((boolean) => {
            if (boolean) {
                setIsPomodoroWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isTodoWidget').then((boolean) => {
            if (boolean) {
                setIsTodoWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isDrinkWidget').then((boolean) => {
            if (boolean) {
                setIsDrinkWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isNoteWidget').then((boolean) => {
            if (boolean) {
                setIsNoteWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isEyeWidget').then((boolean) => {
            if (boolean) {
                setIsEyeWidget(boolean);
            }
        });
        localforage.getItem<boolean>('isWidgetSetting').then((boolean) => {
            if (boolean) {
                setIsWidgetSetting(boolean);
            }
        });
        localforage.getItem<boolean>('isWalkSettingDone').then((boolean) => {
            if (boolean) {
                setIsWalkSettingDone(boolean);
            }
        });
        localforage.getItem<number>('walkDuration').then((boolean) => {
            if (boolean) {
                setWalkDuration(boolean);
            }
        });
        localforage.getItem<number>('walkInterval').then((boolean) => {
            if (boolean) {
                setWalkInterval(boolean);
            }
        });
        localforage.getItem<boolean>('isWalkSettingProcess').then((boolean) => {
            if (boolean) {
                setIsWalkSettingProcess(boolean);
            }
        });
      }, []);
      
    const goToSecondPage = () => {
        setIsFirstPage(false)
    }

    const saveName = (name:string) => {
        setName(name);
        localforage.setItem('name', name);
        setNameSaved(true)
    }
    
    const saveWidgetSetting = () => {
        setIsWidgetSetting(true)
        localforage.setItem('isWidgetSetting', true)
        localforage.setItem('isWalkWidget', isWalkWidget);
        localforage.setItem('isPomodoroWidget', isPomodoroWidget);
        localforage.setItem('isTodoWidget', isTodoWidget);
        localforage.setItem('isDrinkWidget', isDrinkWidget);
        localforage.setItem('isNoteWidget', isNoteWidget);
        localforage.setItem('isEyeWidget', isEyeWidget);

    }

    const saveWalkSetting = () => {
        setIsWalkSettingDone(true)
        localforage.setItem('isWalkSettingDone', isWalkSettingDone)
        localforage.setItem('walkDuration', walkDuration)
        localforage.setItem("walkInterval", walkInterval)
        setIsWalkSettingProcess(false)
        localforage.setItem('isWalkSettingProcess', isWalkSettingProcess)
    }

    return(
        <Box bgcolor="white" color="black">
            {!nameSaved && isFirstPage && (
            <Stack sx={{ minHeight: "100vh", pl:"6vw"}} >
                <Stack>
                    <Typography fontSize="2rem">
                        <strong>WellBalance</strong> -
                    </Typography>
                    <Typography fontSize="2rem" fontWeight="200">
                        WFH Assistance
                    </Typography>
                </Stack>
                <Stack sx={{pt: "25vh"}} spacing={3}>
                    <Typography fontSize="3rem" fontWeight="200">
                        Hello! I'm your <strong>WFH</strong><br/>
                        assistance!
                    </Typography>
                    <StraightIcon sx={{ scale:"2", transform: 'rotate(180deg)', "&:hover": { textDecoration: "underline", cursor: "pointer", scale: "2.2" } }} onClick={() => goToSecondPage()}></StraightIcon>
                </Stack>
            </Stack>
            )}
            {isFirstPage === false && !nameSaved && (
                <Stack sx={{ minHeight: "100vh",pl:"6vw", justifyContent:"center"}} >
                    <Stack spacing={3}>
                        <Typography fontSize="3rem" fontWeight="200">
                            May I know your name?
                        </Typography>
                        <Stack direction="row" alignContent="center" spacing={2}>
                            <TextField
                                sx={{ 
                                    '& .MuiInputBase-root': { 
                                        border: 'none', 
                                        backgroundColor: '#D9D9D9',
                                        borderRadius: '1.3rem',
                                        color: 'black'
                                    },                       
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    }, 
                                    maxWidth: "40vw"
                                }} 
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <StraightIcon sx={{ fontSize:"3rem", transform: 'rotate(90deg)', alignSelf:"center", "&:hover": { textDecoration: "underline", cursor: "pointer", scale: "1.2" } }} onClick={() => saveName(name)}></StraightIcon>
                        </Stack>
                    </Stack>
                </Stack>
            )}
            {!isWidgetSetting && !isWalkSettingProcess && !isFirstPage && nameSaved && (
            <Stack sx={{ minHeight: "100vh",pl:"6vw", justifyContent:"center"}} >
                <Stack spacing={3}>
                    <Typography fontSize="3rem" fontWeight="200">
                        I can help you with these,
                    </Typography>
                    <Stack direction="row" alignContent="center" spacing={3}>
                        <Tooltip title="Walk Widget">
                            <DirectionsRunIcon onClick={() => {setIsWalkWidget(!isWalkWidget); setIsWalkSettingProcess(!isWalkWidget) }} sx={{ fontSize:"7rem", p:"1.5rem", color:isWalkWidget? "white": "black" , backgroundColor:isWalkWidget?  "#212121" : "#D9D9D9", borderRadius:100,  "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"  }}} ></DirectionsRunIcon>
                        </Tooltip>
                        <Tooltip title="Pomodoro Widget">
                        <TimerIcon onClick={() => setIsPomodoroWidget(!isPomodoroWidget)} sx={{ fontSize:"7rem", p:"1.5rem", color:isPomodoroWidget? "white": "black", backgroundColor:isPomodoroWidget? "#212121" : "#D9D9D9", borderRadius:100,  "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"   }}} ></TimerIcon>
                        </Tooltip>
                        <Tooltip title="To-Do List Widget">
                        <FormatListBulletedIcon onClick={() => setIsTodoWidget(!isTodoWidget)} sx={{ fontSize:"7rem", p:"1.5rem", color:isTodoWidget? "white": "black", backgroundColor:isTodoWidget? "#212121" : "#D9D9D9", borderRadius:100, "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"   }}} ></FormatListBulletedIcon>
                        </Tooltip>
                    </Stack>
                    <Stack direction="row" alignContent="center" spacing={3}>
                        <Tooltip title="Drink Reminder Widget">
                            <LocalDrinkIcon onClick={() => setIsDrinkWidget(!isDrinkWidget)} sx={{ fontSize:"7rem", p:"1.5rem", color:isDrinkWidget? "white": "black", backgroundColor:isDrinkWidget? "#212121" : "#D9D9D9", borderRadius:100, "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"   }}} ></LocalDrinkIcon>
                        </Tooltip>
                        <Tooltip title="Notes Widget">
                            <EditNoteIcon onClick={() => setIsNoteWidget(!isNoteWidget)} sx={{ fontSize:"7rem", p:"1.5rem", color:isNoteWidget? "white": "black", backgroundColor:isNoteWidget? "#212121" : "#D9D9D9", borderRadius:100 , "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"   }}} ></EditNoteIcon>
                        </Tooltip>
                        <Tooltip title="20-20-20 Widget">
                            <RemoveRedEyeIcon onClick={() => setIsEyeWidget(!isEyeWidget)} sx={{ fontSize:"7rem", p:"1.5rem", color:isEyeWidget? "white": "black", backgroundColor:isEyeWidget? "#212121" : "#D9D9D9", borderRadius:100 , "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2",color:isWalkWidget? "black": "white",backgroundColor:isWalkWidget? "#D9D9D9":"#212121" , transform:"rotateY(180deg)"   }}} ></RemoveRedEyeIcon>
                        </Tooltip>
                        <StraightIcon sx={{ fontSize:"3rem", transform: 'rotate(90deg)', alignSelf:"center", justifySelf: "center", "&:hover": { textDecoration: "underline", cursor: "pointer", scale:"1.2" }}} onClick={() => saveWidgetSetting()}></StraightIcon>
                    </Stack>
                </Stack>
            </Stack>
            )}
            { isWalkSettingProcess && (
                <Stack sx={{ minHeight: "100vh",pl:"6vw", justifyContent:"center"}} spacing={3}>
                    <Stack direction="row" alignContent="center" spacing={4}>
                        <DirectionsRunIcon sx={{ fontSize:"3rem", p:"0.5rem", color:"black", backgroundColor:"#D9D9D9", borderRadius:100}} ></DirectionsRunIcon>
                        <Typography align="center" fontWeight="200" fontSize="2rem">Walk Reminder</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Typography align="left" fontWeight="200" fontSize="2rem">I want to walk for</Typography>
                        <TextField
                                sx={{ 
                                    '& .MuiInputBase-root': { 
                                        border: 'none', 
                                        backgroundColor: '#D9D9D9',
                                        borderRadius: '1.3rem',
                                        color: 'black'
                                    },                       
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    }, 
                                    maxWidth: "5rem",
                                    fontSize: "2rem"
                                }} 
                                variant="outlined"
                                value={walkDuration}
                                onChange={(e) => setWalkDuration(parseInt(e.target.value))}
                                fullWidth
                                type="number"
                            />
                         <Typography align="left" fontWeight="200" fontSize="2rem">minutes</Typography>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Typography align="left" fontWeight="200" fontSize="2rem">Every</Typography>
                        <TextField
                                sx={{ 
                                    '& .MuiInputBase-root': { 
                                        border: 'none', 
                                        backgroundColor: '#D9D9D9',
                                        borderRadius: '1.3rem',
                                        color: 'black'
                                    },                       
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    }, 
                                    maxWidth: "5rem",
                                    fontSize: "2rem"
                                }} 
                                variant="outlined"
                                value={walkInterval}
                                onChange={(e) => setWalkInterval(parseInt(e.target.value))}
                                fullWidth
                                type="number"
                            />
                         <Typography align="left" fontWeight="200" fontSize="2rem">minutes</Typography>
                    </Stack>
                    <StraightIcon sx={{ fontSize:"3rem", transform: 'rotate(90deg)', alignSelf:"left", "&:hover": { textDecoration: "underline", cursor: "pointer", scale: "1.2" } }} onClick={() => saveWalkSetting()}></StraightIcon>
                </Stack>
            )}
        </Box>
    )
}
        
export default welcomePage;
