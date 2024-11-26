import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import React, { useState,useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon, ChevronRightIcon, ChevronRightSquare } from 'lucide-react-native';
import { Image } from 'expo-image';

import '../i18n'
import { useTranslation } from 'react-i18next';

import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore"; 
import LanguageSelector from '../components/LanguageSelector';
import { useTheme } from '../context/ThemeContext';

export default function AccountProfileScreen() {

    const [username,setUsername] = useState('');
    
    const {t} = useTranslation();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeFromFirestore = onSnapshot(doc(db, 'users', auth.currentUser .uid), (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username || 'User ');
      }
    });

    return () => unsubscribeFromFirestore();
  }, []);

  const onPressGoBack = useCallback(_ => navigation.goBack(), [])

  const {theme,toggleTheme,isDarkTheme} = useTheme()

  
  return (
    <View style={[styles.container,theme.contentBackground]}>

      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={theme.gradientColors}
          style={styles.backButton}
        >

          <TouchableOpacity onPress={onPressGoBack}>

            <View style={styles.backButton}>
              <ChevronLeftIcon size={30} strokeWidth={2.5} color={theme.iconColor} />
            </View>

          </TouchableOpacity>

        </LinearGradient>

      </SafeAreaView>

      <View style={styles.header}>

        <Image source={require('../assets/images/user_fallBack.jpg')} style={styles.profilePicture} />

        <Text style={[styles.username,theme.text]}>{username}</Text>

        <TouchableOpacity 
          style={[styles.editProfileButton, theme.editButton]}  
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={[styles.editProfileText, theme.editText]}>{t('editProfile')}</Text>
          <ChevronRightIcon size={24} color={theme.editIconColor} />  
        </TouchableOpacity>

      </View>

      <View style={[styles.contentSection,theme.headerBackground]}>

        <Text style={[styles.contentTitle,theme.text]}>{t('content')}</Text>

        <View style={styles.contentRow}>

          <Text style={[styles.contentText,theme.text]}>{t('favorites')}</Text>

          <View style={styles.arrowIcon}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </View>

        </View>
        <View style={styles.contentRow}>

          <Text style={[styles.contentText,theme.text]}>{t('watchLater')}</Text>

          <View style={styles.arrowIcon}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </View>

        </View>

      </View>

      <View style={[styles.preferenceSection,theme.headerBackground]}>

        <Text style={[styles.preferenceTitle,theme.text]}>{t('preference')}</Text>

        <View style={styles.preferenceRow}>

        

          <View style={styles.languageSelection}>

          <Text style={[styles.preferenceText,theme.text]}>{t('language')}</Text>

            <View style={styles.languageSection}>

              <LanguageSelector/>

            </View>


          </View>

        </View>
        <View style={styles.preferenceRow}>
          <Text style={[styles.preferenceText,theme.text]}>{isDarkTheme ? t('darkMode') : 'Light Mode'}</Text>
          <Switch
          trackColor={{ false: '#ccc', true: '#555' }}
          thumbColor={isDarkTheme ? '#f4f3f4' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    borderRadius: 24,
    padding: 4,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editProfileButton: {
    flexDirection: 'row',  
    alignItems: 'center',  
    paddingVertical: 12,  
    paddingHorizontal: 16,  
    borderRadius: 30,  
    backgroundColor: '#007bff',  
    marginVertical: 10,  
  },
  editProfileText: {
    fontSize: 16,  
    fontWeight: 'bold',  
    color: '#fff',
    marginRight: 8,  
  },
  contentSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle background for section
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,

  },
  contentText: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,

  },
  preferenceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageSelection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectedLanguage: {
    marginRight: 10,
    fontSize: 14,
    color: '#555',
  },
  languageOption: {
    marginHorizontal: 5,
    fontSize: 14,
    color: '#007bff',
  },
  languageSection:{
    paddingHorizontal:16
  }
});
