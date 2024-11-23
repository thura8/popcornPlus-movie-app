import React, { createContext, useContext } from 'react';
import { useFonts } from 'expo-font';
import Loading from '../components/loading';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
    const [fontsLoaded] = useFonts({
        'Anton': require('../assets/fonts/Anton/Anton-Regular.ttf'),
        'Lato': require('../assets/fonts/Lato/Lato-Black.ttf'),
        'Pacifico': require('../assets/fonts/Pacifico/Pacifico-Regular.ttf'),
        'Montserrat': require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
        'PlayFair': require("../assets/fonts/static/PlayfairDisplay-Regular.ttf")
    });

    if (!fontsLoaded) {
        return <Loading/>;
    }

    return (
        <FontContext.Provider value={true}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);
