import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import Loading from '../components/loading';
import BackButton from '../components/BackButton';
import { useTheme } from '../context/ThemeContext';
import { auth, db } from '../config/firebase';  
import { collection, onSnapshot } from 'firebase/firestore';

import { Image } from 'expo-image';
import '../i18n';
import { useTranslation } from 'react-i18next';

var { width, height } = Dimensions.get('window');

export default function FavoritesScreen() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const userFavoritesRef = collection(db, 'users', userId, 'favorites');

      
      const unsubscribe = onSnapshot(userFavoritesRef, snapshot => {
        const favoriteMovies = snapshot.docs.map(doc => doc.data());
        setFavorites(favoriteMovies); 
        setLoading(false); 
      });

      
      return () => unsubscribe();
    }
  }, []); 

  return (
    <View style={[styles.container, theme.contentBackground]}>
      <SafeAreaView style={[{ paddingHorizontal: 1, marginBottom: 20 }, theme.headerBackground]}>
        <View style={styles.header}>
          <BackButton
            gradientColors={theme.gradientColors}
            iconBackground={theme.iconBackground}
            iconColor={theme.iconColor}
            top={-40}
          />
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, theme.text]}>{t("Favorites")}</Text>
          </View>
        </View>
      </SafeAreaView>


      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, gap: 12 }}
        >
          <View style={styles.resultsContainer}>
            {favorites.length === 0 ? (
              <Text style={[styles.noFavoritesText,theme.text]}>{t("NoFavoritesMessage")}</Text>
            ) : (
              favorites.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={styles.resultItem}>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                      style={styles.movieImage}
                      priority="high"
                    />
                    <Text style={[styles.movieTitle, theme.movieTitleText]}>
                      {item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            )}
          </View>
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
    fontFamily: "Anton",
  },
  titleContainer: {
    flex: 1,
    alignItems: "flex-end",
    position:'relative',
    top:12,
    right:12
  },
  titleText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins-Regular",
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily:"Nunito"
  },
});
