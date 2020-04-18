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
    <Tab.Navigator
      initialRouteName="StoreInputs"
      screenOptions={{ headerShown: false }}
      tabBarOptions={topTabOptions}
    >
      <Tab.Screen name="Buy your Inputs" component={StoreInputs} />
      <Tab.Screen name="Sell your Outputs" component={StoreOutputs} />
    </Tab.Navigator>
  );
};

const StoreNavigator = () => (
  <Stack.Navigator
    initialRouteName="Store"
    screenOptions={{
      header: ({ scene, previous, navigation }) => <Header title="My Store" />,
    }}
  >
    <Stack.Screen name="Store" component={StoreTab} />
    <Stack.Screen name="StoreItemSummary" component={StoreItemSummary} />
    <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
    <Stack.Screen name="BuyInput" component={BuyInput} />
    <Stack.Screen name="SellOutput" component={SellOutput} />
  </Stack.Navigator>
);

export default StoreNavigator;
