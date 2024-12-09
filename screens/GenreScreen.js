import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
import { Image } from "expo-image";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchGenreMovieList } from "../api/movieDb";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "81f2b97bd1318146fa6a370db0415099";

const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
  );
  return response.json();
};

export default function GenreScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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

  // const renderMovie = ({ item }) => (
  //   <View style={styles.movieCard}>
  //     <Image
  //       source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
  //       style={styles.moviePoster}
  //       priority={'high'}
  //     />
  //     <Text style={styles.movieTitle}>{item.title}</Text>
  //   </View>
  // );

  // const handleLoadMore = () => {
  //   if (!isFetchingMore) {
  //     fetchMovies(true);
  //   }
  // };

  const renderMovieCard = (item) => (
    <View style={styles.movieCard} key={item.id}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.moviePoster}
        priority={"high"}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Genre</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={genres}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setGenres}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Choose a genre"
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.moviesContainer}
          onScrollEndDrag={() => {
            if (!isFetchingMore) {
              fetchMovies(true);  
            }
          }}
        >
          <View style={styles.moviesGrid}>
            {movies.map((movie) => renderMovieCard(movie))}
          </View>
          {isFetchingMore && <ActivityIndicator size="small" color="#000" />}
        </ScrollView>
      )}
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: "#EFEFEF",
    borderWidth: 0,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
  },
  listContainer: {
    paddingBottom: 20,
  },
  moviesContainer: {
    paddingBottom: 20,
  },
  moviesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCard: {
    width: "48%", 
    marginBottom: 15,
    alignItems: "center",
  },
  moviePoster: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
