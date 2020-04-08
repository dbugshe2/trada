import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../screens/About/About';
import Faq from '../screens/About/Faq';

const Stack = createStackNavigator();

const AboutNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Faq" component={Faq} />
    </Stack.Navigator>
  );
};

export default AboutNavigator;
