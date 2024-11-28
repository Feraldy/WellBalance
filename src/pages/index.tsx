import { Box, Stack, Typography } from "@mui/material";
import PomodoroWidget from "./components/pomodoroWidget";
import EyeStrainWidget from "./components/eyeStrainWidget";
import DrinkWidget from "./components/drinkWidget";
import ToDoWidget from "./components/todoWidget";
import NoteWidget from "./components/notesWidget";
import WelcomePage from "./components/welcomePage";
import WalkWidget from "./components/walkWidget";
import localforage from "localforage";
import { useEffect, useState } from "react";
import Header from "./components/header";

export default function Home() {
  const [isWalkWidget, setIsWalkWidget] = useState(false);
  const [isPomodoroWidget, setIsPomodoroWidget] = useState(false);
  const [isTodoWidget, setIsTodoWidget] = useState(false);
  const [isDrinkWidget, setIsDrinkWidget] = useState(false);
  const [isNoteWidget, setIsNoteWidget] = useState(false);
  const [isEyeWidget, setIsEyeWidget] = useState(false);
  const [walkDuration, setWalkDuration] = useState(0);
  const [walkInterval, setWalkInterval] = useState(0);
  const [isWidgetSetting, setIsWidgetSetting] = useState(false);
  const [name, setName] = useState('')

  useEffect(() => {
    localforage.getItem('isWidgetSetting').then((boolean) => {
      if (boolean) {
          setIsWidgetSetting(boolean);
      }
    });
    localforage.getItem('isWalkWidget').then((boolean) => {
        if (boolean) {
            setIsWalkWidget(boolean);
        }
    });
    localforage.getItem('isPomodoroWidget').then((boolean) => {
        if (boolean) {
            setIsPomodoroWidget(boolean);
        }
    });
    localforage.getItem('isTodoWidget').then((boolean) => {
        if (boolean) {
            setIsTodoWidget(boolean);
        }
    });
    localforage.getItem('isDrinkWidget').then((boolean) => {
        if (boolean) {
            setIsDrinkWidget(boolean);
        }
    });
    localforage.getItem('isNoteWidget').then((boolean) => {
        if (boolean) {
            setIsNoteWidget(boolean);
        }
    });
    localforage.getItem('isEyeWidget').then((boolean) => {
        if (boolean) {
            setIsEyeWidget(boolean);
        }
    });
    localforage.getItem('isWidgetSetting').then((boolean) => {
        if (boolean) {
            setIsWidgetSetting(boolean);
        }
    });
    localforage.getItem('walkDuration').then((boolean) => {
        if (boolean) {
            setWalkDuration(boolean);
        }
    });
    localforage.getItem('walkInterval').then((boolean) => {
        if (boolean) {
            setWalkInterval(boolean);
        }
    });
    localforage.getItem('name').then((savedName) => {
        if (savedName) {
          setName(savedName);
        }
      });
    
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }} bgcolor="white">
      {isWidgetSetting !== true && ( <WelcomePage name={name} setName={setName} walkDuration={walkDuration} walkInterval={walkInterval} setWalkDuration={setWalkDuration} setWalkInterval={setWalkInterval} isWalkWidget={isWalkWidget} setIsWalkWidget={setIsWalkWidget} isDrinkWidget={isDrinkWidget} setIsDrinkWidget={setIsDrinkWidget} isEyeWidget={isEyeWidget} setIsEyeWidget={setIsEyeWidget} isNoteWidget={isNoteWidget} setIsNoteWidget={setIsNoteWidget} isPomodoroWidget={isPomodoroWidget} setIsPomodoroWidget={setIsPomodoroWidget} isTodoWidget={isTodoWidget} setIsTodoWidget={setIsTodoWidget} isWidgetSetting={isWidgetSetting} setIsWidgetSetting={setIsWidgetSetting}></WelcomePage>
      )}
      <Stack spacing={3}>
        <Stack direction="row" flexGrow="1">
            <Header name={name}></Header>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="stretch" justifyContent="space-evenly" flexGrow="2">
                {isPomodoroWidget === true && (<PomodoroWidget/>)} 
                {isEyeWidget === true && (<EyeStrainWidget />)} 
                {isDrinkWidget === true && (<DrinkWidget />)} 
                {isWalkWidget === true && (<WalkWidget walkDuration={walkDuration} setWalkDuration={setWalkDuration} walkInterval={walkInterval} setWalkInterval={setWalkInterval}/>)} 
        </Stack>
        <Stack direction="row" spacing={3} flexGrow="2">
                {isTodoWidget === true && (<ToDoWidget/>)} 
                {isNoteWidget === true && (<NoteWidget/>)} 
        </Stack>
      </Stack>
    </Box>
  );
};

