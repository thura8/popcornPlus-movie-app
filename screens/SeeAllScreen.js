import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { image185 } from '../api/movieDb';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import Loading from '../components/loading';

import { Image } from 'expo-image';

import '../i18n'
import { useTranslation } from 'react-i18next';

var { width, height } = Dimensions.get('window');

export default function SeeAllScreen({ route }) {
  const [loading, setLoading] = useState(true);

  const {t}=useTranslation()
  
  const { data, title } = route.params;
  const navigation = useNavigation();

  
  useEffect(() => {
    if (data) {
      setLoading(false);  
    }
  }, [data]); 

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#0d1321", paddingHorizontal: 1,marginBottom:20 }}>
        <View style={styles.header}>
          <SafeAreaView style={styles.safeArea}>
            <LinearGradient
              colors={['rgba(29, 45, 68, 0.6)', 'rgba(29, 45, 68, 0.9)']}
              style={styles.backButton}
            >
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <ChevronLeftIcon size={34} strokeWidth={2.5} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </SafeAreaView>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
                {t(title)}
            </Text>
         </View>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 15,
            gap: 12,}}
        >
          <View style={styles.resultsContainer}>
            {data.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={styles.resultItem}>
                    <Image
                      source={{ uri: image185(item?.poster_path) }}
                      style={styles.movieImage}
                      priority='high'
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2d44",
  },
  header: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
  },
  safeArea: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    borderRadius: 12,
    padding: 4,
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
    fontFamily:"Anton"
  },
  titleContainer: {
    flex: 1,               
    alignItems: 'flex-end', 
    paddingRight:20,
  },
  titleText: {
    color: 'white',         
    fontSize: 30,
    fontFamily:"Pacifico"
  },
});
