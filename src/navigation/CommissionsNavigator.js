import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Commission from '../screens/Commission/Commission';
import CommissionHistory from '../screens/Commission/CommissionHistory';
import CashOut from '../screens/Commission/CashOut';

const Stack = createStackNavigator();

const CommissionsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Commission"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Commission" component={Commission} />
      <Stack.Screen name="CommissionHistory" component={CommissionHistory} />
      <Stack.Screen name="CashOut" component={CashOut} />
    </Stack.Navigator>
  );
};

export default CommissionsNavigator;
