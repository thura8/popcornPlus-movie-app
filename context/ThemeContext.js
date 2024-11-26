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
    headerBackground: { backgroundColor: '#F7F7F7' },
    welcomeText: { color: '#969696' },
    username: { color: '#333333', fontWeight: 'semibold' },
    searchIcon: { color: '#333333' },
    contentBackground: { backgroundColor: '#E5E5E5' },
    trendingTitle: { 
        color: '#333333',
        marginHorizontal: 16,
        paddingTop: 10,
        marginBottom: 10,
        fontSize: 28,
        fontFamily:"Pacifico",
        letterSpacing:1},
    sectionTitle:{
        color: '#333333',
        fontSize: 24,
        fontFamily:"Pacifico"
    },
    seeAllButton: { color: '#007BFF'},
    movieTitle: { color: '#333333'},
    searchContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 50,
        backgroundColor: "#ffffff", 
      },
    textInput: {
        paddingBottom: 4,
        paddingLeft: 24,
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#f7f7f7", 
        letterSpacing: 1,
      },

    noMoviesText: {
        color: "#666666", 
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    iconButton: {
        borderRadius: 50,
        padding: 12,
        margin: 4,
        backgroundColor: "#E5F0FF", 
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconColor: "#174A7A",
    tabBackgroundColor: "#ffffff", 
    activeTabColor: "#007BFF", 
    inactiveTabColor: "#808080", 
    gradientColors: ['#A8D8FF', '#5CA0D3'],  
    iconColor: '#ffffff',
    button: { backgroundColor: '#007BFF', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 24 }, 
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }, 
    editButton: { backgroundColor: '#007bff' },  
    editText: { color: '#fff' },  
    editIconColor: '#fff',  
    text: { color: '#000' },
  });
  
  const darkTheme = StyleSheet.create({
    headerBackground: { backgroundColor: '#1A1A1A' },
    welcomeText: { color: '#B0B0B0' },
    username: { color: '#FFFFFF', fontWeight: 'bold' },
    searchIcon: { color: '#F0F0F0' },
    contentBackground: { backgroundColor: '#252525' },
    trendingTitle: { 
        color: '#F7F7F7',
        marginHorizontal: 16,
        paddingTop: 10,
        marginBottom: 10,
        fontSize: 28,
        fontFamily:"Pacifico",
        letterSpacing:1},
    sectionTitle:{
        color: '#F7F7F7',
        fontSize: 24,
        fontFamily:"Pacifico"
    },
    seeAllButton: { color: '#4A90E2'},
    movieTitle: { color: '#F7F7F7'},
    searchContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#333A40",
        borderRadius: 50,
        backgroundColor: "#2c2c2c", 
      },
    textInput: {
        paddingBottom: 4,
        paddingLeft: 24,
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#f7f7f7", 
        letterSpacing: 1,
    },
    noMoviesText: {
        color: "#B0B0B0", // Light gray for "no movies" text in dark mode
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    iconButton: {
        borderRadius: 50,
        padding: 12,
        margin: 4,
        backgroundColor: "#22303C", 
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    iconColor: "#7FB3D5",
    tabBackgroundColor: "#121212",
    activeTabColor: "#4FC3F7", 
    inactiveTabColor: "#888888", 
    gradientColors:  ['#1A3B5D', '#1A3B5D'],  
    iconColor: '#ffffff',
    text: { color: '#ffffff' }, 
    button: { backgroundColor: '#1E88E5', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 24 },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }, 
    cardBackground: { backgroundColor: '#333333', elevation: 3 }, 
    textSecondary: { color: '#B0B0B0' }, 
    editButton: { backgroundColor: '#0066cc' },  
    editText: { color: '#fff' },  
    editIconColor: '#fff', 
  });