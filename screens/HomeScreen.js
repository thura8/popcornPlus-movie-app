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
          <View style={styles.headerLeft}>
            <Text style={[styles.welcomeText,theme.welcomeText]}>
              {t('welcome')}
            </Text>
            <TouchableOpacity style={{position:'relative',top:12}} onPress={() => navigation.navigate("Account")}>
              <Text style={[styles.usernameText,theme.username]}>
                {username ? username : 'Loading...'} 
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <SearchIcon
              size="36" // Smaller icon size
              strokeWidth={2}
              //color="#F7E7DC"
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
    //backgroundColor: "#1d2d44",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:16
  },
  headerLeft: {
    flexDirection: "column",
  },
  welcomeText: {
    fontFamily: "PlayFair",
    fontSize: 20, 
    //color: "#F7E7DC",
  },
  usernameText: {
    fontFamily: "Anton",
    fontSize: 22, 
    //color: "#FFF8F3",
    letterSpacing: 2,
  },
});
