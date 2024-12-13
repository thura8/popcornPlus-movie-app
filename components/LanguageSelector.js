import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import i18n, { saveLanguage } from '../i18n';
import { useTheme } from '../context/ThemeContext';

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { theme } = useTheme();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    saveLanguage(language);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <View style={styles.container}>
      {languages.map(({ code, label }) => (
        <TouchableOpacity
          key={code}
          style={[
            styles.button,
            theme.button,
            selectedLanguage === code && styles.selectedButton,
          ]}
          onPress={() => changeLanguage(code)}
        >
          <Text
            style={[
              styles.buttonText,
              theme.buttonText,
              selectedLanguage === code && styles.selectedText,
            ]}
          >
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
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#339AFF',
    borderWidth: 2,
    borderColor: '#0056B3',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: 'bold', 
    color: '#FFFFFF', 
  },
});
