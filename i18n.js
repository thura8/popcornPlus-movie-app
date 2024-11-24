import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'


import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

const resources = {
    en:{translation : en},
    es:{translation : es},
    fr:{translation:fr}
}

const LANGUAGE_KEY = 'user-selected-language'

i18n
.use(initReactI18next)
.init({
    resources,
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
    escapeValue: false, 
  },
})

const loadLanguage = async ()=>{
  try{
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if(savedLanguage){
      i18n.changeLanguage(savedLanguage)
    }
  }catch(error){
    console.error('Failed to load languagde',error)
  }
}

loadLanguage()

export const saveLanguage = async (language) =>{
  try{
    await AsyncStorage.setItem(LANGUAGE_KEY,language)
  }catch (error){
    console.error('Failed to save language',error)
  }
}


export default i18n