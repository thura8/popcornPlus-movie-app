import * as React from "react";
import { Dimensions, Text, View, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import {image500 } from "../api/movieDb";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import Swiper from "react-native-swiper";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const _imageWidth = width * 0.6
const _imageHeight = _imageWidth * 1.5
const _spacing = 12

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const handleClick = (item) => {
  //   navigation.navigate("Movie", item);
  // };

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e)=>{
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing)
  })

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={theme.trendingTitle}>{t("trending")}</Text>
      {/* <Swiper
        loop={true} 
        autoplay={true} 
        autoplayTimeout={3} 
        showsPagination={false} 
        scrollEnabled={true} 
        style={{ height: height * 0.4 }}
      >
        {data.map((item, index) => (
          <MovieCard
            key={index}
            item={item}
            handleClick={() => handleClick(item)} 
          />
        ))}
      </Swiper> */}
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        snapToInterval={_imageWidth + _spacing}
        decelerationRate="fast"
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        initialScrollIndex={1} 
        getItemLayout={(_, index) => ({
          length: _imageWidth + _spacing, 
          offset: (_imageWidth + _spacing) * index, 
          index,
        })}
        renderItem={({ item, index }) => (
          <MovieCard
            key={index}
            item={item}
            handleClick={() => navigation.navigate("Movie", item)}
            scrollX={scrollX}
            index={index}
          />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

    </View>
  );
}

const MovieCard = ({ item, handleClick,scrollX ,index}) => {

  const stylez = useAnimatedStyle(()=>{
    return {
      transform:[
        {
          scale:interpolate(
            scrollX.value,
            [index - 1,index,index + 1],
            [1.4,1,1.4]
          )
        },
        {
          rotate:`${interpolate(
            scrollX.value,
            [index - 1,index,index + 1],
            [15,0,-15]
          )}deg`
        }
      ]
    }
  })

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.cardContainer}>
        <Animated.Image
          source={{ uri: image500(item.poster_path) }}  
          style={[styles.image,stylez]}
          priority="high"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width:_imageWidth,
    height:_imageHeight,
    borderRadius:40,
    overflow:"hidden"
  },
  image: {
    flex:1
  },
  
});
