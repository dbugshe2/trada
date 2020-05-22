import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Farmers from '../screens/Farmer/Farmers';
import FarmerPhoto from '../screens/Farmer/FarmerPhoto';
import FarmerSummary from '../screens/Farmer/FarmerSummary';
import AddFarmer from '../screens/Farmer/AddFarmer';

const Stack = createStackNavigator();

const FarmerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Farmers"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Farmers" component={Farmers} />
      <Stack.Screen name="AddFarmer" component={AddFarmer} />
      <Stack.Screen name="FarmerPhoto" component={FarmerPhoto} />
      <Stack.Screen name="FarmerSummary" component={FarmerSummary} />
    </Stack.Navigator>
  );
};

export default FarmerNavigator;
