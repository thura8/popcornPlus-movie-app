import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { BackButton } from "../components";

import { Image } from "expo-image";
import { useTheme } from "../context/ThemeContext";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [movieLoading, setMovieLoading] = useState(false);
  const [castLoading, setCastLoading] = useState(false);
  const [similarMoviesLoading, setSimilarMoviesLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxDescriptionLength = 100;
  const description = movie?.overview || "";

  const shortenDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + "..."
      : description;

  const { theme } = useTheme();

  useEffect(() => {
    setMovieLoading(true);
    setCastLoading(true);
    setSimilarMoviesLoading(true);

    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setMovieLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchCreditsDetails(id);
    if (data && data.cast) setCast(data.cast);
    setCastLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setSimilarMoviesLoading(false);
  };

  return (
    <View style={[{ flex: 1 }, theme.contentBackground]}>

      <BackButton 
        gradientColors={theme.movieGradientColors} 
        iconBackground={theme.movieIconBackground}
        iconColor={theme.movieIconColor}
        top={0}
      />


      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1 }}>
        <View style={styles.container}>
          {movieLoading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={{ uri: image500(movie?.poster_path) }}
                style={{ width, height: height * 0.64 }}
                contentFit="cover"
                priority="high"
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

        {!movieLoading && (
          <View style={{ marginTop: -(height * 0.101), marginBottom: 8 }}>
            <Text style={theme.movieTitle}>{movie?.title}</Text>

            {movie?.id ? (
              <Text style={theme.movieScreenText}>
                {movie?.status} - {movie?.release_date?.split("-")[0]} -{" "}
                {movie?.runtime} min
              </Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
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

            <Text style={theme.overviewColor}>
              {isExpanded ? description : shortenDescription}
            </Text>

            {description.length > maxDescriptionLength && (
              <TouchableOpacity
                style={theme.readMoreButton}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Text style={theme.readMoreButtonText}>
                  {isExpanded ? "Show less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!castLoading && <Cast cast={cast} />}

        {!similarMoviesLoading && (
          <MovieLists
            title="Similar Movies"
            hideSeeAll={true}
            data={similarMovies}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  
});
