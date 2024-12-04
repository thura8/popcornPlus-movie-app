import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrendingMovies, MovieLists } from "../components";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from "../api/movieDb";
import { useNavigation } from "@react-navigation/native";
import { SearchIcon } from "lucide-react-native";
import Loading from "../components/loading";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore"; 

import '../i18n'
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { Image } from "expo-image";


export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const {t} = useTranslation();

  useEffect(() => {
    const unsubscribeFromFirestore = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username || 'User ' );
      }
    });

    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();

    return () => unsubscribeFromFirestore();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };

  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
  };

  const {theme,isDarkTheme} = useTheme()

  return (
    <View style={[styles.container,theme.contentBackground]}>
      <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView style={[styles.header,theme.headerBackground]}>

          <View style={{flexDirection:'row',position:'relative',top:10}}>
            
             <TouchableOpacity onPress={()=> navigation.openDrawer()}> 
              <Image 
                source={require("../assets/images/user_fallBack.jpg")} 
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 80,
                }} 
              />
            </TouchableOpacity>

            <View style={styles.headerLeft}>
              <Text style={[styles.welcomeText,theme.welcomeText]}>
                {t('welcome')}
              </Text>
              <TouchableOpacity style={{position:'relative',top:8}} onPress={() => navigation.navigate("Account")}>
                <Text style={[styles.usernameText,theme.username]}>
                  {username ? username : 'Loading...'} 
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <SearchIcon
              size="36" 
              strokeWidth={2}
              style={theme.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieLists title="upcoming" data={upcoming} />
          <MovieLists title="topRated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:16
  },
  headerLeft: {
    flexDirection: "column",
    marginLeft:12
  },
  welcomeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 24, 
    
  },
  usernameText: {
    fontFamily: "Lato",
    fontSize: 20, 
    letterSpacing: 2,
  },
});
