import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "@react-navigation/native";
  import { image185 } from "../api/movieDb";
  import { Image } from "expo-image";
  
  var { width, height } = Dimensions.get("window");
  
  export default function MovieLists({ title, data, hideSeeAll }) {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          {!hideSeeAll && (
            <TouchableOpacity onPress={() => navigation.navigate("SeeAll", { data,title })}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          )}
        </View>
  
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {data.map((item, index) => {
            let movieName = item.title;
  
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={{ marginRight: 16, marginBottom: 4 }}>
                  <Image
                    // source={require("../assets/images/theWolfOfWallStreet_movie_poster.jpg")}
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.image}
                    contentFit="contain"
                  />
                  <Text style={styles.movieName}>
                    {movieName.length > 25
                      ? movieName.slice(0, 25) + "..."
                      : movieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 32,
    },
    innerContainer: {
      marginHorizontal: 16,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      color: "#FFF8F3",
      fontSize: 24,
      fontFamily:"Pacifico"
    },
    seeAll: {
      fontSize: 18,
      color: "#F7E7DC",
      fontFamily:"PlayFair"
    },
    image: {
      borderRadius: 24,
      width: width * 0.43,
      height: height * 0.32,
    },
    movieName: {
      color: "#F7E7DC",
      marginLeft: 12,
      fontFamily:"Anton"
    },
  });