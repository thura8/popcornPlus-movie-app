import React from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BackButton } from '../components';

export default function TermsAndConditionsScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, theme.headerBackground]}>
      <View style={styles.header}>
        <BackButton 
            gradientColors={theme.gradientColors} 
            iconBackground={theme.iconBackground}
            iconColor={theme.iconColor}
            top={-45}
        />
        
        <Text style={[styles.title, theme.text]}>Terms and Conditions</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.text, theme.text]}>
          1. By using this app, you agree to abide by our terms and policies.
        </Text>
        <Text style={[styles.text, theme.text]}>
          2. Unauthorized reproduction or distribution of any part of this app is strictly prohibited.
        </Text>
        <Text style={[styles.text, theme.text]}>
          3. This app does not guarantee uninterrupted or error-free service.
        </Text>
        <Text style={[styles.text, theme.text]}>
          4. We reserve the right to update these terms at any time without notice.
        </Text>
        <Text style={[styles.text, theme.text]}>
          5. All content within the app is for informational purposes only.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
