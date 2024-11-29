import { View, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeftIcon } from 'lucide-react-native'
import { useTheme } from '../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'

export default function BackButton({gradientColors,iconColor,iconBackground}) {

    const navigation = useNavigation()
    const {theme} = useTheme()
    const onPressGoBack = useCallback(_ => navigation.goBack(), [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={gradientColors}
        style={styles.backButtonContainer}
      >
        <TouchableOpacity onPress={onPressGoBack} style={styles.touchableArea}>
          <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
            <ChevronLeftIcon size={30} strokeWidth={2.5} color={iconColor} />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      backButtonContainer: {
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
      },
      touchableArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconContainer: {
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
})