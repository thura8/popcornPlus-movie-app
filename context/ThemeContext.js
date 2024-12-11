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
        fontFamily:"Poppins-Regular",
        },
    sectionTitle:{
        color: '#333333',
        fontSize: 24,
        fontFamily:"Montserrat"
    },
    seeAllButton: { color: '#007BFF'},
    movieTitleText: { color: '#333333'},
    searchContainer: {
        
        borderColor: "#E0E0E0",
        
        backgroundColor: "#ffffff", 
      },
    textInput: {
        
        color: "#666666", 
        
      },

    noMoviesText: {
        color: "#666666", 
        fontSize: 26,
        textAlign: "center",
        marginTop: 20,
        fontFamily:'Nunito'
    },
    iconButton: {
       
        backgroundColor: "#E5F0FF", 
        
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
    loadingColor: '#007BFF',
    overviewColor: {
        color: "#1F2937",
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        letterSpacing: 0.5,
        fontFamily:"PlayFair"
    },
    movieGradient:["transparent", "rgba(229,229,229,0.5)", "rgba(229,229,229,1)"],
    movieTitle:{
        color:"#000",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 0.5,
        fontFamily:"Anton"
    },
    movieScreenText:{
        color: "#1F2937",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
        fontFamily:"Montserrat",
    },
    castText:{
        color: "#1F2937",
        fontSize: 18,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 20,
        fontFamily:"Anton"
    },
    characterText:{
        color: "#000", fontSize: 12, marginTop: 4 ,fontFamily:"Lato"
    },
    personNameText:{
        color: "#1F2937", fontSize: 12, marginTop: 4,fontFamily:"Montserrat"
    },
    readMoreButton:{
        marginTop: 24,
        marginHorizontal:145,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor:"#F7F7F7",
        borderRadius: 20,
        alignItems: 'center',
    },
    readMoreButtonText:{
        color: '#808080', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    gradientColors: ['#BBDEFB', '#90CAF9'], 
    iconColor: '#0D47A1', 
    iconBackground: '#E3F2FD',

    movieGradientColors: ['rgba(255, 255, 255, 0.6)', 'rgba(240, 240, 240, 0.4)'],
    movieIconBackground: 'rgba(255, 255, 255, 0.3)',
    movieIconColor: '#000000',
    drawerBackgroundColor: '#ffffff',
    drawerTextColor: '#333333',
    activeItemColor: '#1E90FF', 
    inactiveItemColor: '#B0C4DE',    
    inputBackground: { backgroundColor: "#E0F7FA" },
    placeholderText: { color: "#607D8B" },
    selectedItemBackground: { color: "#B3E5FC" },
    icon: { color: "#0288D1" },
    loadingIndicator: { color: "#0288D1" },
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
        fontFamily:"Poppins-Regular",
    },
    sectionTitle:{
        color: '#F7F7F7',
        fontSize: 24,
        fontFamily:"Montserrat"
    },
    seeAllButton: { color: '#4A90E2'},
    movieTitle: { color: '#F7F7F7'},
    movieTitleText:{color:'#F7F7F7'},
    searchContainer: {
        
        borderColor: "#333A40",
        
        backgroundColor: "#2c2c2c", 
      },
    textInput: {
        color: "#f7f7f7", 
        
    },
    noMoviesText: {
        color: "#f7f7f7", 
        fontSize: 26,
        textAlign: "center",
        marginTop: 20,
        fontFamily:"Nunito"
    },
    iconButton: {
        
        backgroundColor: "#22303C", 
        
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
    loadingColor:'#fff',
    overviewColor: {
        color: "#9CA3AF",
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        letterSpacing: 0.5,
        fontFamily:"PlayFair"
    },
    movieGradient:["transparent", "rgba(37, 37, 37, 0.8)", "#252525"],
    movieTitle:{
        color: "white",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 0.5,
        fontFamily:"Anton"
    },
    movieScreenText:{
        color: "#9CA3AF",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
        fontFamily:"Montserrat",
    },
    castText:{
        color: "#FFFFFF",
        fontSize: 18,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 20,
        fontFamily:"Anton"
    },
    characterText:{
        color: "white", fontSize: 12, marginTop: 4 ,fontFamily:"Lato"
    },
    personNameText:{
        color: "#9CA3AF", fontSize: 12, marginTop: 4,fontFamily:"Montserrat"
    },
    readMoreButton:{
        marginTop: 24,
        marginHorizontal:145,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor:"#1A1A1A",
        borderRadius: 20,
        alignItems: 'center',
    },
    readMoreButtonText:{
        color: '#888888', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    gradientColors: ['#333333', '#444444'],
    iconColor: '#FFF',
    iconBackground: '#555555',
    movieGradientColors: ['rgba(51, 51, 51, 0.6)', 'rgba(85, 85, 85, 0.4)'],
    movieIconBackground: 'rgba(0, 0, 0, 0.3)',
    movieIconColor: '#FFFFFF',
    drawerBackgroundColor: '#333333',
    drawerTextColor: '#ffffff',
    activeItemColor: '#007AFF', 
    inactiveItemColor: '#5F9EA0', 
    inputBackground: { backgroundColor: "#37474F" },
    placeholderText: { color: "#B0BEC5" },
    selectedItemBackground: { color: "#0288D1" },
    icon: { color: "#81D4FA" },
    loadingIndicator: { color: "#81D4FA" },
  });