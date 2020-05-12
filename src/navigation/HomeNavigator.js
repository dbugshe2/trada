import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/Header';
import SettingsNavigator from './SettingsNavigator';
import AboutNavigator from './AboutNavigator';
import Home from '../screens/Home/Home';
import AddCashViaBank from '../screens/Home/AddCashViaBank';
import AddCashViaUssd from '../screens/Home/AddCashViaUssd';
import TransferCash from '../screens/Home/TransferCash';
import TransferDetails from '../screens/Home/TransferDetails';
import TransferOptions from '../screens/Home/TransferOptions';
import ProfileNavigator from './ProfileNavigator';
import { topTabOptions } from '../constants/navigation';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

const AddCashTab = () => (
  <Tab.Navigator tabBarOptions={topTabOptions}>
    <Tab.Screen
      options={{ title: 'Via Bank Transfer' }}
      name="AddCashViaBank"
      component={AddCashViaBank}
    />
    <Tab.Screen
      options={{ title: 'Via USSD Code' }}
      name="AddCashViaUssd"
      component={AddCashViaUssd}
    />
  </Tab.Navigator>
);

const AddCash = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        header: ({ scene, previous, navigation }) => (
          <Header backTitle="Add Cash" />
        ),
      }}
      name="AddCashTab"
      component={AddCashTab}
    />
  </Stack.Navigator>
);

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TransferCash" component={TransferCash} />
      <Stack.Screen name="TransferOptions" component={TransferOptions} />
      <Stack.Screen name="TransferDetails" component={TransferDetails} />
      <Stack.Screen
        name="AddCash"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header backTitle="Add Cash" />
          ),
        }}
        component={AddCash}
      />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
      <Stack.Screen name="SettingsNavigator" component={SettingsNavigator} />
      <Stack.Screen name="AboutNavigator" component={AboutNavigator} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
