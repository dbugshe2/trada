import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Farmer from '../screens/Farmer/Farmer';
import FarmerBio from '../screens/Farmer/FarmerBio';
import FarmerCrop from '../screens/Farmer/FarmerCrop';
import FarmerPhoto from '../screens/Farmer/FarmerPhoto';
import FarmerSummary from '../screens/Farmer/FarmerSummary';

const Stack = createStackNavigator();

const FarmerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Farmer"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Farmer" component={Farmer} />
      <Stack.Screen name="FarmerBio" component={FarmerBio} />
      <Stack.Screen name="FarmerCrop" component={FarmerCrop} />
      <Stack.Screen name="FarmerPhoto" component={FarmerPhoto} />
      <Stack.Screen name="FarmerSummary" component={FarmerSummary} />
    </Stack.Navigator>
  );
};

export default FarmerNavigator;
