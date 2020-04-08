import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeNavigator from './HomeNavigator';
import MarketNavigator from './MarketNavigator';
import StoreNavigator from './StoreNavigator';
import Leaderboard from '../screens/Commission/Leaderboard';

import { bottomBarStyles } from '../constants/navigation';

import ImageIcon from '../components/primary/ImageIcon';
import { COLORS } from '../utils/theme';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.primary}
      inactiveColor={COLORS.white}
      shifting={false}
      screenOptions={{ headerShown: false }}
      barStyle={bottomBarStyles}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <ImageIcon name={focused ? 'houseAlt' : 'house'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreNavigator}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => (
            <ImageIcon name={focused ? 'storeFrontAlt' : 'storeFront'} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketNavigator}
        options={{
          tabBarLabel: 'Market Price',
          tabBarIcon: ({ focused }) => (
            <ImageIcon name={focused ? 'trendAlt' : 'trend'} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ focused }) => (
            <ImageIcon name={focused ? 'eventAlt' : 'event'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
