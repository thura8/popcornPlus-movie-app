import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchGenreMovieList, image185 } from "../api/movieDb";
import { useTheme } from "../context/ThemeContext";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { BackButton } from "../components";
import { useTranslation } from "react-i18next";

var { width, height } = Dimensions.get("window");

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "81f2b97bd1318146fa6a370db0415099";

const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
  );
  return response.json();
};

export default function GenreScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(28);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { theme } = useTheme();
  const {t} = useTranslation()

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect(() => {
    if (value) {
      setMovies([]);
      setPage(1);
      fetchMovies();
    }
  }, [value]);

  const getGenreList = async () => {
    try {
      const data = await fetchGenreMovieList();
      setGenres(data.genres.map((genre) => ({ label: genre.name, value: genre.id })));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = async (loadMore = false) => {
    try {
      if (!value) return;

      if (loadMore) setIsFetchingMore(true);
      else setIsLoading(true);

      const data = await fetchMoviesByGenre(value, loadMore ? page + 1 : 1);

      setMovies((prevMovies) => (loadMore ? [...prevMovies, ...data.results] : data.results));
      if (loadMore) setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, theme.headerBackground]}>
      
      <View style={{marginBottom:48}}>
        <BackButton 
          gradientColors={theme.gradientColors} 
          iconBackground={theme.iconBackground}
          iconColor={theme.iconColor}
          top={-55}
          left={-10}
        />

        <Text style={[styles.header, theme.text]}>{t('selectGenre')}</Text>
      </View>



      <DropDownPicker
        open={open}
        value={value}
        items={genres}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setGenres}
        style={[styles.dropdown, theme.inputBackground]}
        dropDownContainerStyle={[styles.dropdownContainer, theme.inputBackground]}
        placeholderStyle={{
          color: theme.placeholderText,
          fontSize: 14,
          
        }}
        listItemContainerStyle={{
          paddingVertical: 10,
        }}
        listItemLabelStyle={{
          color: theme.text.color,
          fontSize: 16,
        }}
        selectedItemContainerStyle={{
          backgroundColor: theme.selectedItemBackground.color,
          borderRadius: 24,
        }}
        ArrowDownIconComponent={({ style }) => (
          <ChevronDown style={style} size={24} color={theme.icon.color} />
        )}
        ArrowUpIconComponent={({ style }) => (
          <ChevronUp style={style} size={24} color={theme.icon.color} />
        )}
        dropDownDirection="BOTTOM" 
        zIndex={1000} 
        zIndexInverse={3000} 
      />


      {isLoading ? (
        <ActivityIndicator size="large" color={theme.loadingIndicator.color} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, gap: 12 }}
          onScroll={() => {
            if (!isFetchingMore) {
              fetchMovies(true);
            }
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.resultsContainer}>
            {movies.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={styles.movieContainer}>
                  <Image
                    source={{ uri: image185(item.poster_path) }}
                    style={styles.image}
                    contentFit="contain"
                    priority="high"
                  />
                  <Text style={[styles.movieName, theme.text]}>
                    {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          {isFetchingMore && (
            <ActivityIndicator size="small" color={theme.loadingIndicator.color} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    position:'absolute',
    right:0,
    top:0
  },
  dropdown: {
    borderWidth: 0,
    marginTop: 8,
    marginBottom:24
  },
  dropdownContainer: {
    borderWidth: 0,
  },
  resultsContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  movieContainer: {
    marginBottom: 16,
  },
  image: {
    borderRadius: 12,
    width: width * 0.43,
    height: height * 0.3,
  },
  movieName: {
    marginTop: 8,
    fontFamily: "Anton",
  },
});
