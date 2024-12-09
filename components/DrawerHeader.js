import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Image } from "expo-image";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const DrawerHeader = (props) => {
  
  const { theme } = useTheme();
  const navigation = useNavigation()

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[{ flex: 1 },theme.headerBackground]}>
      <View style={[styles.header,  theme.headerBackground ]}>
        <Image
          source={require("../assets/images/user_fallBack.jpg")}
          style={styles.profileImage}
          priority={"high"}
        />
        <View style={styles.userProfile}>
            <Text style={[styles.username, theme.username]}>Big Boss</Text>

            <TouchableOpacity style={styles.viewProfileButton} 
              onPress={ ()=>navigation.navigate("Profile")}
              >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={[styles.viewProfileText,  theme.welcomeText ]}>View Profile</Text>
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
