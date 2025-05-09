import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import React, { useState,useRef,useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Eye, EyeOff } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import { t } from 'i18next';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!email || !password || !username) {
      Alert.alert('All fields are required.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: email,
          createdAt: new Date(),
        });

        console.log('User registered successfully!');
      } catch (err) {
        console.log('Error registering user: ', err.message);
        Alert.alert('Error', err.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} keyboardOpeningTime={0}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView>
          <View style={{ alignItems: 'center', marginTop: 12 }}>
            <Image
              source={require('../assets/images/popcorn-plusOne.png')}
              style={{ width: 230,height: 230, borderRadius: 100 }}
              priority='high'
            />
            <Text style={{ color: '#f0ebd8', fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto-Regular'}}>
              {t('completeYourProfile')}
            </Text>
          </View>
        </SafeAreaView>
        <View style={[styles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
          <View>
            <Text style={styles.label}>{t('username')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#C0C0C0"
              value={username}
              onChangeText={value => setUserName(value)}
              returnKeyType='next'
              onSubmitEditing={()=>emailRef.current.focus()}
            />
            <Text style={styles.label}>{t('email')}</Text>
            <TextInput
              ref={emailRef}
              autoCapitalize="none"
              style={styles.input}
              value={email}
              onChangeText={value => setEmail(value)}
              placeholderTextColor="#C0C0C0"
              placeholder="Enter your email"
              returnKeyType='next'
              onSubmitEditing={()=>passwordRef.current.focus()}
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
                onChangeText={value => setPassword(value)}
                returnKeyType='done'
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconEye}>
                {showPassword ? <Eye color="#333" /> : <EyeOff color="#333" />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.text}>{t('alreadyHaveAnAccount')}</Text>
            <TouchableOpacity onPress={useCallback(_=> navigation.goBack(),[])}>
              <Text style={styles.loginText}>{t('login')}</Text>
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
  formContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: 'Lato',
  },
  input: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    color: '#333',
    borderRadius: 24,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: 12,
    backgroundColor: '#0d1321',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f0ebd8',
    fontFamily: 'BebasNeue',
    letterSpacing: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  text: {
    color: 'black',
    fontWeight: 600,
    fontFamily: 'Montserrat',
  },
  loginText: {
    color: '#007BFF',
    fontWeight: 600,
    marginLeft: 4,
    fontFamily: 'Montserrat',
  },
  iconEye: {
    position: 'absolute',
    right: 12,
    top: '47%',
  },
  passwordContainer: {
    position: 'relative',
  },
});
