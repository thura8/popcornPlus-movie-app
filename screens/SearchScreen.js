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
  import { useNavigation,DrawerActions } from "@react-navigation/native";
  import { ArrowBigLeftDash, Menu, Search } from "lucide-react-native";
  import { debounce } from "lodash";
  import { image185, searchMovies } from "../api/movieDb";
  import { Image } from "expo-image";
  import { useTheme } from "../context/ThemeContext";

  import '../i18n'
  import { useTranslation } from "react-i18next";
  import * as Progress from "react-native-progress"

  var { width, height } = Dimensions.get("window");
  
  export default function SearchScreen() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {t} = useTranslation()
    const {theme} = useTheme()

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
          if(data && data.results) setResults(data.results);
      })
      }else{
        setLoading(false);
        setResults([])
      }
    }

    const handleText = useCallback(debounce(handleSearch,400),[])

    const openDrawer = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
      <SafeAreaView style={[styles.safeArea,theme.contentBackground]}>

        <View style={styles.header}>

         <TouchableOpacity onPress={openDrawer}>

           <Menu strokeWidth={2.5} size={36}/>

         </TouchableOpacity>

          <Text style={[styles.searchText,theme.text]}>{t('search')}</Text>

        </View>


        <View style={[styles.textInputContainer,theme.searchContainer]}>
          <Search size={20} color="#999" /> 
          <TextInput
            onChangeText={handleText}
            placeholder={t('searchMovie')}
            placeholderTextColor="#999"
            style={[styles.textInput,theme.textInput]}
          />
        </View>
  
        {loading ? (
          <View style={[styles.absoluteCenter, { height, width }]}>
            <Progress.CircleSnail thickness={12} size={100} color={theme.loadingColor} />
          </View>
        ) : results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={[styles.resultsText,theme.movieTitleText]}>Results ({results.length})</Text>
  
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
                        priority='high'
                      />
  
                      <Text style={[styles.movieTitle,theme.movieTitleText]}>
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
              source={require("../assets/images/movie_watching.png")}
              style={styles.movieWatching}
              
            />
            <Text style={theme.noMoviesText}>
              {t('noMoviesToShow')}
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    header:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:24,
      marginBottom:16
    },
    searchText:{
      fontFamily:"Lato",
      fontSize:28
    },

    scrollContainer: {
      paddingHorizontal: 15,
      gap: 12,
    },
  
    resultsText: {
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
      borderRadius: 20,
    },
    absoluteCenter: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    
    },
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginVertical: 10,
      
      borderRadius: 16, 
      paddingHorizontal: 16,
      paddingVertical: 12, 
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      
      borderWidth: 1.5, 
    },
    textInput: {
      flex: 1,
      fontSize: 18, 
      fontFamily: "Lato",
      
      marginLeft: 8, 
    },
  });