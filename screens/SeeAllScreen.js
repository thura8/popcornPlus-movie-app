import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { image185 } from '../api/movieDb';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import Loading from '../components/loading';
import BackButton from '../components/BackButton'
import { useTheme } from '../context/ThemeContext';

import { Image } from 'expo-image';

import '../i18n'
import { useTranslation } from 'react-i18next';

var { width, height } = Dimensions.get('window');

export default function SeeAllScreen({ route }) {
  const [loading, setLoading] = useState(true);

  const {t}=useTranslation()
  
  const { data, title } = route.params;
  const navigation = useNavigation();

  const {theme} = useTheme()

  
  useEffect(() => {
    if (data) {
      setLoading(false);  
    }
  }, [data]); 

  return (
    <View style={[styles.container,theme.contentBackground]}>
      <SafeAreaView style={[{paddingHorizontal: 1,marginBottom:20 },theme.headerBackground]}>
        <View style={styles.header}>

          <BackButton 
            gradientColors={theme.gradientColors} 
            iconBackground={theme.iconBackground}
            iconColor={theme.iconColor}
            top={-35}
          />

          <View style={styles.titleContainer}>
            <Text style={[styles.titleText,theme.text]}>
                {t(title)}
            </Text>
         </View>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
        showsVerticalScrollIndicator={false}
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
  safeArea: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    //color: "#f0ebd8",
    marginLeft: 4,
    fontFamily:"Anton"
  },
  titleContainer: {
    flex: 1,               
    alignItems: 'center', 
    paddingTop:10,
    paddingRight:20,
  },
  titleText: {
    color: 'white',         
    fontSize: 30,
    fontFamily:"Pacifico"
  },
});
