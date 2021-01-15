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
import codePush from 'react-native-code-push';
import { errorMessage } from './src/utils/toast';

Sentry.init({
  dsn:
    'https://5a462ccaf5d6424ca916b8cfc779aefe@o326364.ingest.sentry.io/5172785',
});

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const App = () => {
  React.useEffect(() => {
    try {
      codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }
      SplashScreen.hide();
    } catch (error) {
      captureException(error);
      errorMessage('An error occured please restart Tradr');
    }
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
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

export default codePush(codePushOptions)(App);
