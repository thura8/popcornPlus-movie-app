import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Image } from "expo-image";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {auth,db} from '../config/firebase'
import {doc,onSnapshot} from "firebase/firestore"

import { useImage } from "../context/ImageProvider";

const DrawerHeader = (props) => {
  const [username,setUsername] = useState('')
  const { theme } = useTheme();
  const navigation = useNavigation()
  const {t} = useTranslation()

  useEffect(()=>{
    const unsubscribeFromFirestore = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username || 'User');
      }
    });

    return () => unsubscribeFromFirestore();
  },[])

  const {profileImage} = useImage()

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[{ flex: 1 },theme.headerBackground]}>
      <View style={[styles.header,  theme.headerBackground ]}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../assets/images/user_fallBack.jpg")}
          style={styles.profileImage}
          priority={"high"}
        />
        <View style={styles.userProfile}>
            <Text style={[styles.username, theme.username]}>
              {username ? username : 'Loading...'}
            </Text>

            <TouchableOpacity style={styles.viewProfileButton} 
              onPress={ ()=>navigation.navigate("Profile")}
              >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={[styles.viewProfileText,  theme.welcomeText ]}>{t('viewProfile')}</Text>
                    <ChevronRight color={"#B0B0B0"}/>
                </View>
            </TouchableOpacity>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal:10,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 80,
    marginBottom: 10,
  },
  userProfile:{
    position:'relative',
    left:-15
  },
  username: {
    width:160,
    fontFamily: "Lato",
    fontSize: 20, 
    flexWrap:'wrap',
    paddingLeft:10
  },
  viewProfileButton: {
    paddingLeft:10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: "600",
  },
  
});

export default DrawerHeader;
