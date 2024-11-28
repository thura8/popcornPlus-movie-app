import {
    View,
    Text,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { fallBackCastImage,image185 } from "../api/movieDb";
  import { Image } from "expo-image";
  
  import { useTheme } from "../context/ThemeContext";

  export default function Cast({ cast }) {
    
    const {theme} = useTheme();
  
    return (
      <View style={{ marginVertical: 24 }}>
        <Text style={theme.castText}>Top Cast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {cast &&
            cast.map((person, index) => {
              return (
                <View
                  key={index}
                  style={{ marginRight: 16, alignItems: "center" }}
                >
                  <View style={styles.castImageContainer}>
                    <Image
                      //source={require("../assets/images/brueWayne.jpg")}
  
                      source={{
                        uri: image185(person?.profile_path) || fallBackCastImage,
                      }}
                      style={{ borderRadius: 16, height: 96, width: 80 }}
                      priority='high'
                    />
                  </View>
  
                  <Text style={theme.characterText}>
                    {person?.character.length > 10
                      ? person?.character.slice(0, 10) + "..."
                      : person?.character}
                  </Text>
                  <Text style={theme.personNameText}>
                    {person?.original_name.length > 10
                      ? person?.original_name.slice(0, 10) + "..."
                      : person?.original_name}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    castText: {
      color: "#FFFFFF",
      fontSize: 18,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 20,
      fontFamily:"Anton"
    },
    castImageContainer: {
      overflow: "hidden",
      borderRadius: 40,
      height: 80,
      width: 80,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#6B7280",
    },
  });