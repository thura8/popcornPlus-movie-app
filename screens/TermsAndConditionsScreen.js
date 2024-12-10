import React from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BackButton } from '../components';
import { useTranslation } from 'react-i18next';

export default function TermsAndConditionsScreen() {
  const { theme } = useTheme();
  const {t} = useTranslation()

  return (
    <SafeAreaView style={[styles.container, theme.headerBackground]}>
      <View style={styles.header}>
        <BackButton 
            gradientColors={theme.gradientColors} 
            iconBackground={theme.iconBackground}
            iconColor={theme.iconColor}
            top={-45}
        />
        
        <Text style={[styles.title, theme.text]}>{t('termsAndConditions')}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.text, theme.text]}>
          1. {t('termsAgreement')}
        </Text>
        <Text style={[styles.text, theme.text]}>
          2. {t('unauthorizedUse')}
        </Text>
        <Text style={[styles.text, theme.text]}>
          3. {t('serviceGuarantee')}
        </Text>
        <Text style={[styles.text, theme.text]}>
          4. {t('updateRights')}
        </Text>
        <Text style={[styles.text, theme.text]}>
          5. {t('informationalContent')}
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
