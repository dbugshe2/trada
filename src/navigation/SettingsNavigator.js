import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import ChangePassword from '../screens/Settings/ChangePassword';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
