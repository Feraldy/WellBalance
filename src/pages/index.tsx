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
    localforage.getItem<boolean>('isWidgetSetting').then((boolean) => {
      if (boolean) {
          setIsWidgetSetting(boolean);
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
    localforage.getItem<string>('name').then((savedName) => {
        if (savedName) {
          setName(savedName);
        }
      });
    
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }} bgcolor="white">
      {isWidgetSetting !== true && ( <WelcomePage name={name} setName={setName} walkDuration={walkDuration} walkInterval={walkInterval} setWalkDuration={setWalkDuration} setWalkInterval={setWalkInterval} isWalkWidget={isWalkWidget} setIsWalkWidget={setIsWalkWidget} isDrinkWidget={isDrinkWidget} setIsDrinkWidget={setIsDrinkWidget} isEyeWidget={isEyeWidget} setIsEyeWidget={setIsEyeWidget} isNoteWidget={isNoteWidget} setIsNoteWidget={setIsNoteWidget} isPomodoroWidget={isPomodoroWidget} setIsPomodoroWidget={setIsPomodoroWidget} isTodoWidget={isTodoWidget} setIsTodoWidget={setIsTodoWidget} isWidgetSetting={isWidgetSetting} setIsWidgetSetting={setIsWidgetSetting}></WelcomePage>
      )}
      {isWidgetSetting === true && (
        <Stack spacing={3}>
        <Stack direction="row" flexGrow="1">
            <Header name={name}></Header>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="stretch" justifyContent="space-evenly" flexGrow="2">
                {isWalkWidget === true && (<WalkWidget walkDuration={walkDuration} setWalkDuration={setWalkDuration} walkInterval={walkInterval} setWalkInterval={setWalkInterval}/>)} 
                {isPomodoroWidget === true && (<PomodoroWidget/>)} 
                {isEyeWidget === true && (<EyeStrainWidget />)} 
                {isDrinkWidget === true && (<DrinkWidget />)} 

        </Stack>
        <Stack direction="row" spacing={3} flexGrow="2">
                {isTodoWidget === true && (<ToDoWidget/>)} 
                {isNoteWidget === true && (<NoteWidget/>)} 
        </Stack>
      </Stack>
      )}
      
    </Box>
  );
};

