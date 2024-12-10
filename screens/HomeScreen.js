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
import { Menu } from "lucide-react-native";
import Loading from "../components/loading";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
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
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribeFromFirestore = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setUsername(doc.data().username || 'User');
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

  return (
    <View style={[styles.container, theme.contentBackground]}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SafeAreaView style={[styles.headerContainer, theme.headerBackground]}>
        
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={[styles.menuIconContainer,theme.contentBackground]}>
          <Menu size={30} strokeWidth={2.5} style={[styles.menuIcon, theme.menuIcon]} />
        </TouchableOpacity>

        
        <View style={styles.userInfoContainer}>
          <TouchableOpacity>
            <Text style={[styles.usernameText, theme.username]}>
              {username ? username : 'Loading...'}
            </Text>
          </TouchableOpacity>

          
          <Image
            source={require("../assets/images/user_fallBack.jpg")}
            style={styles.userImage}
          />
        </View>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    marginBottom: 8,
  },
  menuIconContainer: {
    position: 'relative',
    top: 5,
    padding: 8,
    borderRadius: 25,  
    boxShadow: '0px 0px 15px rgba(0,0,0,0.3)',  
  },
  menuIcon: {
    padding: 6,
    borderRadius: 18,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    top: 5,
  },
  usernameText: {
    fontFamily: "Lato",
    fontSize: 22,
    letterSpacing: 1.5,
    marginRight: 12,
  },
  userImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
