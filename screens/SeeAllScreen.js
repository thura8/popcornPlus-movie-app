import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { image185, fetchUpComingMovies, fetchTopRatedMovies } from '../api/movieDb'; 
import { useNavigation } from "@react-navigation/native";
import Loading from '../components/loading';
import BackButton from '../components/BackButton';
import { useTheme } from '../context/ThemeContext';
import { Image } from 'expo-image';
import '../i18n';
import { useTranslation } from 'react-i18next';
import * as Progress from "react-native-progress"

var { width, height } = Dimensions.get('window');

export default function SeeAllScreen({ route }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { t } = useTranslation();
  
  const { title } = route.params;
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {

    const fetchInitialMovies = async () => {
      let initialMovies;
      if (title === "upcoming") {
        initialMovies = await fetchUpComingMovies();
      } else if (title === "topRated") {
        initialMovies = await fetchTopRatedMovies();
      }
      if (initialMovies && initialMovies.results) {
        setMovies(initialMovies.results);
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, [title]);

  const fetchMoreMovies = async () => {
  
    if (loadingMore || loading) return;
  
    //console.log("Fetching more movies...");
  
    
    setLoadingMore(true);
  
    const newPage = page + 1;
    let newMovies;
  
    try {
      
      if (title === "upcoming") {
        newMovies = await fetchUpComingMovies(newPage);
      } else if (title === "topRated") {
        newMovies = await fetchTopRatedMovies(newPage);
      }
  
      if (newMovies && newMovies.results && newMovies.results.length > 0) {
    
        setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
        setPage(newPage);
      }
    } catch (error) {
  
      //console.log("Error fetching movies:", error);
    } finally {
  
      setLoadingMore(false);
      //console.log("loadingMore after fetch:", loadingMore);
    }
  };  

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20; 

    if (isAtBottom) {
      fetchMoreMovies();
    }
  };

  return (
    <View style={[styles.container, theme.contentBackground]}>
      <SafeAreaView style={[{ paddingHorizontal: 1, marginBottom: 20 }, theme.headerBackground]}>
        <View style={styles.header}>
          <BackButton 
            gradientColors={theme.gradientColors} 
            iconBackground={theme.iconBackground}
            iconColor={theme.iconColor}
            top={-46}
          />
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, theme.text]}>
              {t(title)}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, gap: 12 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.resultsContainer}>
            {movies.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={{ marginBottom: 16 }}>
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.image}
                    contentFit="contain"
                    priority="high"
                  />
                  <Text style={[styles.movieName, theme.movieTitleText]}>
                    {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}

          </View>

          {loadingMore && (
            <View style={styles.loadingContainer}>
              <Progress.CircleSnail thickness={4} size={80} color={theme.loadingColor} />
            </View>
          )}
        </ScrollView>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',

  },
  titleText: {
    fontSize: 24,
  },
  resultsContainer: {
    paddingBottom: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap'
  },
  image: {
    borderRadius: 12,
    width: width * 0.43,
    height: height * 0.30,
  },
  movieName: {
    color: "#F7E7DC",
    marginTop: 8,
    fontFamily: "Anton",
  },
  loadingContainer: {
    position: 'relative', 
    bottom: 0, 
    marginTop: 10,
    marginHorizontal:"auto",
    alignItems: 'center', 
    justifyContent: 'center', 
  }
});