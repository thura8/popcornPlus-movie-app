import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
  } from "react-native";
  import React from "react";
  import Carousel from "react-native-snap-carousel";
  import { useNavigation } from "@react-navigation/native";
  import { image500 } from "../api/movieDb";
  import { Image } from "expo-image";
  
  var { width, height } = Dimensions.get("window");
  
  export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
      navigation.navigate("Movie", item);
    };
    return (
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            marginHorizontal: 16,
            paddingTop: 10,
            marginBottom: 10,
            color: "#ffffff",
            fontSize: 28,
            fontFamily:"Pacifico",
            letterSpacing:1
          }}
        >
          Trending
        </Text>
  
        <Carousel
          data={data}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={() => handleClick(item)} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      </View>
    );
  }
  
  const MovieCard = ({ item, handleClick }) => {
    // console.log("item.poster_path: ", item.poster_path);
  
    return (
      <TouchableWithoutFeedback onPress={handleClick}>
        <Image
          // source={require("../assets/images/titanic_movie_poster.jpg")}
  
          source={{ uri: image500(item.poster_path) }}
          style={styles.image}
          contentFit="contain"
        />
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      borderRadius: 24,
      width: width * 0.6,
      height: height * 0.4,
    },
  });