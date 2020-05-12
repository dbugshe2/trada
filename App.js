/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import * as Sentry from '@sentry/react-native';
import { captureException } from '@sentry/react-native';

import RootNavigator from './src/navigation/RootNavigator';

import { AuthProvider } from './src/context/auth/AuthContext';

import SplashScreen from 'react-native-splash-screen';
import { COLORS } from './src/utils/theme';

Sentry.init({
  dsn:
    'https://5a462ccaf5d6424ca916b8cfc779aefe@o326364.ingest.sentry.io/5172785',
});

const App = () => {
  React.useEffect(() => {
    try {
      SplashScreen.hide();
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }
    } catch (error) {
      captureException(error);
    }
  }, []);
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar barStyle="light-content" /> */}
        <RootNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default App;
