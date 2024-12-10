import { View, Text, TouchableOpacity, StyleSheet, Switch, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ChevronRight, Menu } from 'lucide-react-native';

import '../i18n';
import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '../components';
import { useTheme } from '../context/ThemeContext';

export default function AccountProfileScreen() {

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  const supportData = [
    { title: t('helpCenter'), info: t('faqs') },
    { title: t('contactSupport'), info: t('emailUs') },
    { title: t('feedback'), info: t('rateUs') },
  ];

  const aboutData = [
    { title: t('privacyPolicy'), info: t('dataSecurity') },
    { title: t('appVersion'), info: '1.0.0' },
  ];


  return (
    <View style={[styles.container, theme.contentBackground]}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Menu strokeWidth={2.5} size={36} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <Text style={[styles.searchText, theme.text]}>{t('settings')}</Text>
      </SafeAreaView>

      <View style={[styles.supportSection, theme.headerBackground]}>
        <Text style={[styles.sectionTitle, theme.text]}>{t('support')}</Text>
        {supportData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.rowTitle, theme.text]}>{item.title}</Text>
            <Text style={[styles.rowInfo, theme.text]}>{item.info}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.aboutSection, theme.headerBackground]}>
        <Text style={[styles.sectionTitle, theme.text]}>{t('about')}</Text>
        
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={[styles.rowTitle, theme.text]}>{t('termsAndConditions')}</Text>
            <ChevronRight size={20} color={theme.text.color} />
          </TouchableOpacity>
        
          {aboutData.map((item, index) => (
            <View key={index} style={styles.row}>
            <Text style={[styles.rowTitle, theme.text]}>{item.title}</Text>
            <Text style={[styles.rowInfo, theme.text]}>{item.info}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.preferenceSection, theme.headerBackground]}>
        <Text style={[styles.preferenceTitle, theme.text]}>{t('preference')}</Text>
        <View style={styles.preferenceRow}>
          <View style={styles.languageSelection}>
            <Text style={[styles.preferenceText, theme.text]}>{t('language')}</Text>
            <View style={{marginHorizontal:16}}>
              <LanguageSelector />
            </View>
          </View>
        </View>
        <View style={styles.preferenceRow}>
          <Text style={[styles.preferenceText, theme.text]}>
            {isDarkTheme ? t('darkMode') : t('lightMode')}
          </Text>
          <Switch
            trackColor={{ false: '#ccc', true: '#555' }}
            thumbColor={isDarkTheme ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={isDarkTheme}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchText: {
    fontFamily: 'Lato',
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'SourceSans3-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowInfo: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  supportSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  aboutSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  versionText: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
    color: '#555',
  },
  preferenceSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  preferenceTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'SourceSans3-Bold',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
  },
  languageSelection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
