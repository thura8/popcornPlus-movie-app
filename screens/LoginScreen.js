import React, { useState,useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Eye, EyeOff,PlusIcon } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import {useTheme} from '../context/ThemeContext'

import '../i18n'
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation()

  const {theme} = useTheme()
  const passwordRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful!');
        setError('');
      } catch (err) {
        console.error('Login Error:', err);
        if (err && err.code) {
          if (err.code === 'auth/wrong-password') {
            setError('Incorrect password. Please try again.');
          } else if (err.code === 'auth/user-not-found') {
            setError('No user found with this email address.');
          } else if (err.code === 'auth/invalid-email') {
            setError('Invalid email address.');
          } else {
            setError('Login failed. Please try again.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
      <KeyboardAwareScrollView contentContainerStyle={[styles.container]} enableOnAndroid={true} keyboardOpeningTime={0}
      >
        <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView>
          <View style={styles.header}>
            <Image
              source={require('../assets/images/popcorn-plusOne.png')}
              style={styles.logo}
              priority='high'
            />
            <Text style={styles.appTitle}>{t('pleaseLoginToContinue')}</Text>
            
          </View>
        </SafeAreaView>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#C0C0C03"
              value={email}
              onChangeText={(value) => setEmail(value)}
              onSubmitEditing={()=>passwordRef.current.focus()}
              returnKeyType='next'
            />

            <View style={styles.passwordContainer}>
              <Text style={styles.label}>{t('password')}</Text>
              <TextInput
                ref={passwordRef}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#C0C0C0"
                value={password}
                onChangeText={(value) => setPassword(value)}
                returnKeyType='done'
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconEye}
              >
                {showPassword ? <Eye color="#333" /> : <EyeOff color="#333" />}
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>{t('login')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.text}>{t('dontHaveAnAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: 260,
    height: 260,
    borderRadius: 100,
  },
  appTitle: {
    color: '#f0ebd8',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginVertical: 8,
    paddingTop: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: 'Lato',
  },
  input: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    color:'#333',
    borderRadius: 24,
    marginBottom: 24,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#f0ebd8',
    fontFamily: 'BebasNeue',
    letterSpacing: 4,
  },
  passwordContainer: {
    position: 'relative',
  },
  iconEye: {
    position: 'absolute',
    right: 12,
    top: '41%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  signUpText: {
    color: '#007BFF',
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Montserrat',
  },
});
