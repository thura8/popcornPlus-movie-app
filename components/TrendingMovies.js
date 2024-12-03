import * as React from "react";
import { Dimensions, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import {image500 } from "../api/movieDb";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={theme.trendingTitle}>{t("trending")}</Text>
{/* 
      <Carousel
        loop
        width={width}  
        height={height * 0.4} 
        autoPlay={true}         
        data={data}
        scrollAnimationDuration={3000}
        onSnapToItem={(index) => console.log("Current index:", index)}
        renderItem={({ index }) => (
          <MovieCard item={data[index]} handleClick={() => handleClick(data[index])} />
        )}
        

      /> */}
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: image500(item.poster_path) }}  
          style={styles.image}
          contentFit="contain"
          priority="high"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  image: {
    borderRadius: 40,
    width: width * 0.6,  
    height: height * 0.4,  
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
