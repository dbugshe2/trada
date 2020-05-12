import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import AppDrawer from './AppDrawer';
import { captureException } from '@sentry/react-native';
import Splash from '../screens/Splash';
import { useAuthContext } from '../context/auth/AuthContext';
// import { SplashScreen } from 'react-native-splash-screen';
const Stack = createStackNavigator();

const RootNavigator = (props) => {
  const { verifyLogin, isAuthenticated, loading } = useAuthContext();
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        await verifyLogin();
        // SplashScreen.hide();
      } catch (error) {
        captureException(error);
      }
    };
    bootstrapAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="SplashScreen" component={Splash} />
        ) : isAuthenticated ? (
          <Stack.Screen name="App" component={AppDrawer} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
