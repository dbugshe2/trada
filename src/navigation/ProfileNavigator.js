import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from '../components/Header';
import PersonalInfo from '../screens/Profile/PersonalInfo';
import VerifyBvn from '../screens/Profile/VerifyBvn';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
  return (
    <Tab.Navigator initialRouteName="PersonalInfo">
      <Tab.Screen name="PersonalInfo" component={PersonalInfo} />
      <Tab.Screen name="Verification" component={VerifyBvn} />
    </Tab.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileTab" component={ProfileTab} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
