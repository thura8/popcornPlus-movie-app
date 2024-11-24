import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

const ThemeContext = createContext()

const THEME_KEY = 'user-theme';

export const ThemeProvider = ({children})=>{

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(()=>{
        loadTheme()
    },[])

    const loadTheme = async ()=>{
        try{
            const savedTheme = await AsyncStorage.getItem(THEME_KEY)
            if(savedTheme !== null){
                setIsDarkTheme(JSON.parse(savedTheme))
            }
        }catch(error){
            console.error("Failed to load theme : ",error);
        }
    }

    const toggleTheme = async ()=>{

        try{
            const newTheme = !isDarkTheme;
            setIsDarkTheme(newTheme);
            await AsyncStorage.setItem(THEME_KEY,JSON.stringify(newTheme))

        }catch(error){
            console.error('Failed to save theme: ',error)

        }
    }

    const theme = isDarkTheme ? darkTheme : lightTheme;

    return(
        <ThemeContext.Provider value={{isDarkTheme,theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);

const lightTheme = StyleSheet.create({
    background: { backgroundColor: '#ffffff' },
    text: { color: '#000000' },
    button: { backgroundColor: '#007BFF', color: '#ffffff' },
  });
  
  const darkTheme = StyleSheet.create({
    background: { backgroundColor: '#121212' },
    text: { color: '#ffffff' },
    button: { backgroundColor: '#1E88E5', color: '#ffffff' },
  });