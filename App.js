import React, { useEffect, useState } from 'react';
import * as Sentry from 'sentry-expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { captureException } from 'sentry-expo';
import { COLORS } from './src/utils/theme';
import { AuthProvider } from './src/context/auth/AuthContext';
import { CommissionProvider } from './src/context/commission/CommissionContext';
import { VariationProvider } from './src/context/variation/VariationContext';

console.disableYellowBox = true;

Sentry.init({
  dsn: 'https://5a462ccaf5d6424ca916b8cfc779aefe@sentry.io/5172785',
  enableInExpoDevelopment: true,
  debug: true,
});

const skipLoading = false;

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      async function asyncBootstrap() {
        setLoading(true);
        await Font.loadAsync({
          ...Ionicons.font,
          montserratLight: require('./assets/fonts/MontserratLight.ttf'),
          montserratRegular: require('./assets/fonts/MontserratRegular.ttf'),
          montserratMedium: require('./assets/fonts/MontserratMedium.ttf'),
          robotoRegular: require('./assets/fonts/RobotoRegular.ttf'),
          robotoMedium: require('./assets/fonts/RobotoMedium.ttf'),
        });
        setLoading(false);
      }
      // load assets
      asyncBootstrap();
    } catch (error) {
      captureException(error);
      setLoading(false);
    }
  }, []);

  if (loading && !skipLoading) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <VariationProvider>
        <CommissionProvider>
          <SafeAreaProvider>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <RootNavigator />
            </View>
          </SafeAreaProvider>
        </CommissionProvider>
      </VariationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
