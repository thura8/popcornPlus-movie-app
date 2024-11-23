import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import i18n from '../i18n'

export default function LanguageSelector() {

    const [selectedLanguage,setSelectedLanguage] = useState(i18n.language)

    const changeLanguage = (language)=>{
        i18n.changeLanguage(language)
        setSelectedLanguage(language)
    }

  return (
    <View style={styles.container}>
        {/* <Text style={styles.text}>Select a Language:</Text> */}

        <TouchableOpacity
        style={selectedLanguage === 'en' ? styles.selectedButton : styles.button}
        onPress={() => changeLanguage('en')}
        >
        <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={selectedLanguage === 'es' ? styles.selectedButton : styles.button}
        onPress={() => changeLanguage('es')}
        >
        <Text style={styles.buttonText}>Español</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
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
    selectedButton: {
      padding: 10,
      backgroundColor: '#28a745', 
      marginVertical: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });