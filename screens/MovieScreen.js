import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import  {
  useRoute,
  useNavigationState, 
  useNavigation,
  CommonActions
} from "@react-navigation/native";
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
import {CircleX, EllipsisVertical, Home,HeartIcon} from "lucide-react-native"

import { Image } from "expo-image";
import { useTheme } from "../context/ThemeContext";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [movieLoading, setMovieLoading] = useState(false);
  const [castLoading, setCastLoading] = useState(false);
  const [similarMoviesLoading, setSimilarMoviesLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ openModal , setOpenModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const navigation = useNavigation()
  const navigationState = useNavigationState(state => state)
  const routeCount = navigationState.routes.length
  const isNavigating = navigationState.isNavigating

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

  const onFavoritePress = ()=>{
    setIsFavorite(!isFavorite)
  }

  const onGoHomePress = () => {
    setOpenModal(false);
  
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    }, 500);
  };
  

  function renderModal() {
    return (
      <Modal
        visible={openModal}
        animationType="fade"
        transparent={true} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.card}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenModal(false)} 
            >
              <CircleX style={styles.closeButtonText} size={26} />
            </TouchableOpacity>

            <View style={styles.list}>
              <TouchableOpacity style={styles.element} onPress={onFavoritePress}>
                {isFavorite ? <HeartIcon size={28} strokeWidth={2.75} color={"#f547ad"} />:<HeartIcon width={25} height={25} color={"#7e8590"} />}
                <Text style={styles.label}>Favourites</Text>
              </TouchableOpacity>
  
              {routeCount > 2 &&
               <TouchableOpacity style={styles.element} onPress={onGoHomePress}>
                 <Home width={25} height={25} color="#7e8590" />
                <Text style={styles.label}>Home</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  

  return (
    <View style={[{ flex: 1 }, theme.contentBackground]}>

              <BackButton 
                 gradientColors={theme.movieGradientColors} 
                 iconBackground={theme.movieIconBackground}
                 iconColor={theme.movieIconColor}
                 top={0}
               />

               <TouchableOpacity style={{position:"absolute",top:58, right:20,zIndex:21}} onPress={()=> setOpenModal(true)} >
                 <EllipsisVertical size={34} />
               </TouchableOpacity>
               {renderModal()}


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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center", 
    alignItems: "center", 
  },
  card: {
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 10, 
    width: 210, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
  },
  list:{
    marginTop:8
  },
  element: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width:150
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    position: "absolute", 
    top: 5,
    right: -18,
    backgroundColor: "transparent",
    paddingHorizontal:24
  
  },
  closeButtonText: {
    fontWeight: "bold",
    color: "#7e8590", 
  },
});
