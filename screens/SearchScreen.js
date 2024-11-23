import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { ArrowBigLeftDash } from "lucide-react-native";
  import Loading from "../components/loading";
  import { debounce } from "lodash";
  import { image185, searchMovies } from "../api/movieDb";
  import { Image } from "expo-image";

  var { width, height } = Dimensions.get("window");
  
  export default function SearchScreen() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    

    const handleSearch = value =>{
      if(value && value.length > 2){
        setLoading(true);
        searchMovies({
          query:value,
          include_adult: 'false',
          language: 'en-US',
          page:'1'
        }).then(data=> {
          setLoading(false)
          //console.log('Movies are fetched',data)
          if(data && data.results) setResults(data.results);
      })
      }else{
        setLoading(false);
        setResults([])
      }
    }

    const handleText = useCallback(debounce(handleSearch,400),[])

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={handleText}
            placeholder="Search Movie"
            placeholderTextColor="lightgray"
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.iconButton}
          >
            <ArrowBigLeftDash size={25} color="#3e5c76" />
          </TouchableOpacity>
        </View>
  
        {loading ? (
          <Loading />
        ) : results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={styles.resultsText}>Results ({results.length})</Text>
  
            <View style={styles.resultsContainer}>
            
              {results.map((item, index) => {
              
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push("Movie", item)}
                  >
                    <View style={styles.resultItem}>
                      <Image
                        //source={require("../assets/images/titanic_movie_poster.jpg")}
                        source={{uri: image185(item?.poster_path)}}
                        style={styles.movieImage}
                        contentFit="contain"
                      />
  
                      <Text style={styles.movieTitle}>
                        {item?.title.length > 22
                          ? item?.title.slice(0, 22) + "..."
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/movie_watching.jpg")}
              style={styles.movieWatching}
              contentFit="contain"
            />
            <Text style={{ color: "white", fontSize: 18 }}>
              No movies to show
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: "#1d2d44",
      flex: 1,
    },
    searchContainer: {
      marginHorizontal: 16,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#748cab",
      borderRadius: 50,
    },
    textInput: {
      paddingBottom: 4,
      paddingLeft: 24,
      flex: 1,
      fontSize: 16,
      fontWeight: "600",
      color: "#f0ebd8",
      letterSpacing: 1,
    },
    iconButton: {
      borderRadius: 50,
      padding: 12,
      margin: 4,
      backgroundColor: "#f0ebd8",
    },
    scrollContainer: {
      paddingHorizontal: 15,
      gap: 12,
    },
  
    resultsText: {
      color: "white",
      fontWeight: "600",
      marginLeft: 4,
    },
    resultsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    resultItem: {
      marginBottom: 16,
      paddingBottom: 8,
    },
    movieImage: {
      borderRadius: 24,
      width: width * 0.44,
      height: height * 0.3,
    },
    movieTitle: {
      color: "#f0ebd8",
      marginLeft: 4,
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    movieWatching: {
      marginVertical: 24,
      height: 384,
      width: 384,
      borderRadius: 24,
    },
  });