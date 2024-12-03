import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon, ChevronRightSquare } from 'lucide-react-native';
import { Image } from 'expo-image';

import '../i18n'
import { useTranslation } from 'react-i18next';

import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore"; 
import { LanguageSelector } from '../components';
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

  

  const {theme,toggleTheme,isDarkTheme} = useTheme()

  
  return (
    <View style={[styles.container,theme.contentBackground]}>

      <View style={styles.header}>

        <Image source={require('../assets/images/user_fallBack.jpg')} style={styles.profilePicture} />

        <Text style={[styles.username,theme.text]}>{username ? username : 'Loading ...'}</Text>

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

          <TouchableOpacity style={styles.arrowIcon} onPress={()=>navigation.navigate("Favorites")}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </TouchableOpacity>

        </View>
        {/* <View style={styles.contentRow}>

          <Text style={[styles.contentText,theme.text]}>{t('watchLater')}</Text>

          <View style={styles.arrowIcon}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </View>

        </View> */}

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
          <Text style={[styles.preferenceText,theme.text]}>{isDarkTheme ? t('darkMode') : t('lightMode')}</Text>
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
    marginRight: 8,
    fontFamily:'Inter-Regular'  
  },
  contentSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily:"SourceSans3"
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
    fontFamily:"Roboto-Regular"
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily:"SourceSans3"
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
    fontFamily:"Roboto-Regular",
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
