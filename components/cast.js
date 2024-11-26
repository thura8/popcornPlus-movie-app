import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { fallBackCastImage,image185 } from "../api/movieDb";
  import { Image } from "expo-image";
  
  export default function Cast({ cast }) {
    // let personName = "Christian Bale";
    // let characterName = "Bruce Wayne";
  
    return (
      <View style={{ marginVertical: 24 }}>
        <Text style={styles.castText}>Top Cast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {cast &&
            cast.map((person, index) => {
              return (
                <TouchableOpacity
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
  
                  <Text style={{ color: "white", fontSize: 12, marginTop: 4 ,fontFamily:"Lato"}}>
                    {person?.character.length > 10
                      ? person?.character.slice(0, 10) + "..."
                      : person?.character}
                  </Text>
                  <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4,fontFamily:"Montserrat" }}>
                    {person?.original_name.length > 10
                      ? person?.original_name.slice(0, 10) + "..."
                      : person?.original_name}
                  </Text>
                </TouchableOpacity>
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