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
        'PlayFair': require("../assets/fonts/static/PlayfairDisplay-Regular.ttf"),
        'Inter-Black' : require('../assets/fonts/Inter/static/Inter_18pt-Black.ttf'),
        'Inter-Light':require("../assets/fonts/Inter/static/Inter_18pt-Light.ttf"),
        'Inter-Regular':require("../assets/fonts/Inter/static/Inter_18pt-Regular.ttf"),
        'Bebas_Neue' : require('../assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf'),
        'Nunito':require('../assets/fonts/Nunito/static/Nunito-ExtraBold.ttf'),
        'Poppins-Regular':require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Roboto-Regular':require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        'SourceSans3':require('../assets/fonts/Source_Sans_3/static/SourceSans3-Regular.ttf')

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
