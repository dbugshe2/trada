import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { AuthContext } from '../context';
import AuthNavigator from './AuthNavigator';
import AppDrawer from './AppDrawer';
import { captureException } from 'sentry-expo';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  // static contextType = AuthContext;

  // componentDidMount() {
  //   try {
  //     this.context.verifyLogin();
  //   } catch (error) {
  //     captureException(error);
  //   }
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {loading ? ( */}
        {/* <Stack.Screen name="SplashScreen" component={Splash} /> */}
        {/* ) : isAuthenticated ? ( */}
        <Stack.Screen name="App" component={AppDrawer} />
        {/* ) : ( */}
        <Stack.Screen name="Auth" component={AuthNavigator} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
