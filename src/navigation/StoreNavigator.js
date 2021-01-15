import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from '../components/Header';
import StoreInputs from '../screens/Store/StoreInputs';
import StoreItemSummary from '../screens/Store/StoreItemSummary';
import StoreOutputs from '../screens/Store/StoreOutputs';
import PhotoUpload from '../screens/Home/PhotoUpload';
import BuyInput from '../screens/Home/BuyInput';
import SellOutput from '../screens/Home/SellOutput';
import { topTabOptions } from '../constants/navigation';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const StoreTab = () => {
  return (
    <Tab.Navigator initialRouteName="MyInputs" tabBarOptions={topTabOptions}>
      <Tab.Screen
        name="MyInputs"
        component={StoreInputs}
        options={{ title: 'My Inputs' }}
      />
      <Tab.Screen
        name="MyOutputs"
        component={StoreOutputs}
        options={{ title: 'My Outputs' }}
      />
    </Tab.Navigator>
  );
};

const StoreNavigator = () => (
  <Stack.Navigator initialRouteName="Store">
    <Stack.Screen
      options={{
        header: ({ scene, previous, navigation }) => (
          <Header title="My Store" />
        ),
      }}
      name="Store"
      component={StoreTab}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="StoreItemSummary"
      component={StoreItemSummary}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="PhotoUpload"
      component={PhotoUpload}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="BuyInput"
      component={BuyInput}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="SellOutput"
      component={SellOutput}
    />
  </Stack.Navigator>
);

export default StoreNavigator;
