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
  import { useTheme } from "../context/ThemeContext";

  import '../i18n'
  import { useTranslation } from "react-i18next";
  
  var { width, height } = Dimensions.get("window");
  
  export default function MovieLists({ title, data, hideSeeAll }) {
    const navigation = useNavigation();

    const {t} = useTranslation();
    const {theme} = useTheme()
  
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={[styles.title,theme.sectionTitle]}>{t(title)}</Text>
          {!hideSeeAll && (
            <TouchableOpacity onPress={() => navigation.navigate("SeeAll", { data,title })}>
              <Text style={[styles.seeAll,theme.seeAllButton]}>{t('seeAll')}</Text>
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
                    
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.image}
                    priority='high'
                  />
                  <Text style={[styles.movieName,theme.movieTitleText]}>
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
      fontFamily:"Roboto-Regular"
    },
    image: {
      borderRadius: 24,
      width: width * 0.43,
      height: height * 0.30,
    },
    movieName: {
      color: "#F7E7DC",
      marginLeft: 12,
      fontFamily:"Anton"
    },
  });