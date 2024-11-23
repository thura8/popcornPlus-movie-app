import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import React, { useState,useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon, ChevronRightSquare } from 'lucide-react-native';
import { Image } from 'expo-image';

import '../i18n'
import { useTranslation } from 'react-i18next';

import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore"; 
import LanguageSelector from '../components/LanguageSelector';

export default function AccountProfileScreen() {

    const [username,setUsername] = useState('');
    
    const {t} = useTranslation();

  const navigation = useNavigation();

  const handleLanguageChange = (lng) => {
    console.log(`${lng} is selected`)
  };

  const handleToggleDarkMode = (isEnabled) => {
    console.log('Dark mode:', isEnabled);
  };

  useEffect(() => {
    const unsubscribeFromFirestore = onSnapshot(doc(db, 'users', auth.currentUser .uid), (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username || 'User ');
      }
    });

    return () => unsubscribeFromFirestore();
  }, []);

  const onPressGoBack = useCallback(_ => navigation.goBack(), [])

  
  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={['rgba(116, 140, 171, 0.6)', 'rgba(116, 140, 171, 0.9)']}
          style={styles.backButton}
        >

          <TouchableOpacity onPress={onPressGoBack}>

            <View style={styles.backButton}>
              <ChevronLeftIcon size={34} strokeWidth={2.5} color="white" />
            </View>

          </TouchableOpacity>

        </LinearGradient>

      </SafeAreaView>

      <View style={styles.header}>

        <Image source={require('../assets/images/user_fallBack.jpg')} style={styles.profilePicture} />

        <Text style={styles.username}>{username}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.editProfile}>{t('editProfile')}</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.contentSection}>

        <Text style={styles.contentTitle}>{t('content')}</Text>

        <View style={styles.contentRow}>

          <Text style={styles.contentText}>{t('favorites')}</Text>

          <View style={styles.arrowIcon}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </View>

        </View>
        <View style={styles.contentRow}>

          <Text style={styles.contentText}>{t('watchLater')}</Text>

          <View style={styles.arrowIcon}>
            <ChevronRightSquare size={24} strokeWidth={2.5} color="gray" />
          </View>

        </View>

      </View>

      <View style={styles.preferenceSection}>

        <Text style={styles.preferenceTitle}>{t('preference')}</Text>

        <View style={styles.preferenceRow}>

          <Text style={styles.preferenceText}>{t('language')}</Text>

          <View style={styles.languageSelection}>

            {/* <TouchableOpacity onPress={() => handleLanguageChange('en')}>
                <Text style={styles.selectedLanguage}>English (Selected)</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLanguageChange('fr')}>
              <Text style={styles.languageOption}>French</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleLanguageChange('es')}>
              <Text style={styles.languageOption}>Spanish</Text>
            </TouchableOpacity>*/}

            <LanguageSelector/>



          </View>

        </View>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceText}>{t('darkMode')}</Text>
          <Switch onValueChange={handleToggleDarkMode} />
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
    borderRadius: 12,
    padding: 4,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  editProfile: {
    color: '#007bff',
  },
  contentSection: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  contentText: {
    fontSize: 14,
  },
  arrowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  preferenceTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  preferenceText: {
    fontSize: 14,
  },
  languageSelection: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
