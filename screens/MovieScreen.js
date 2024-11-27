import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieLists from "../components/MovieLists";
import {
  fetchCreditsDetails,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieDb";
import Loading from "../components/loading";

import { Image} from "expo-image";
import { useTheme } from "../context/ThemeContext";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [isExpanded,setIsExpanded] = useState(false)

  const maxDescriptionLength = 100
  const description = movie?.overview || '';

  const shortenDescription = description.length > maxDescriptionLength ? description.substring(0,maxDescriptionLength) + '...' : description

  const {theme} = useTheme();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchCreditsDetails(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <View style={[{ flex: 1 },theme.contentBackground]}>
      
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={['rgba(29, 45, 68, 0.6)', 'rgba(29, 45, 68, 0.9)']}
          style={styles.backButton}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={34} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1 }}
        
      >
        <View style={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={{ uri: image500(movie?.poster_path) }}
                style={{ width, height: height * 0.64}}
                contentFit="cover"
                priority='high'
                
              />
              <LinearGradient
                colors={theme.movieGradient}
                
                style={{
                  width,
                  height: height * 0.4,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          )}
        </View>

        <View style={{ marginTop: -(height * 0.101), marginBottom: 8 }}>
          <Text
            style={theme.movieTitle}
          >
            {movie?.title}
          </Text>

          {movie?.id ? (
            <Text style={theme.movieScreenText}>
              {movie?.status} - {movie?.release_date?.split("-")[0]} -{" "}
              {movie?.runtime} min
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
               marginHorizontal: 16,
               
            }}
          >
            {movie?.genres?.map((genre, index) => {
              let showDot = index + 1 !== movie.genres.length;
              return (
                <Text key={index} style={theme.movieScreenText}>
                  {genre?.name} {showDot ? "." : null}
                </Text>
              );
            })}
          </View>

          <Text
            style={theme.overviewColor}
          >
            {isExpanded ? description : shortenDescription}
          </Text>

          {description.length > maxDescriptionLength && (
            <TouchableOpacity style={theme.readMoreButton} onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={theme.readMoreButtonText}>
                {isExpanded ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Cast cast={cast} />

        <MovieLists
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  safeArea: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    top: 0, 
  },
  backButton: {
    borderRadius: 12,
    padding: 4,
  },
  
  
});