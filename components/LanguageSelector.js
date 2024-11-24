import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import i18n,{saveLanguage} from '../i18n';

export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        saveLanguage(language)
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
    ];

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Select a Language:</Text> */}
            {languages.map(({ code, label }) => (
                <TouchableOpacity
                    key={code}
                    style={styles.button}
                    onPress={() => changeLanguage(code)}
                >
                    <Text style={[styles.buttonText, selectedLanguage === code && styles.selectedText]}>
                        {label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection:'row',
        gap:20,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    selectedText: {
        textDecorationLine: 'underline',
    },
});