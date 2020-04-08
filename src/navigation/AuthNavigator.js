import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPassword from '../screens/Auth/ResetPassword';
import VerifyPhoneNumber from '../screens/Auth/VerifyPhoneNumber';
import VerifyPasswordReset from '../screens/Auth/VerifyPasswordReset';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Register from '../screens/Auth/Register';
import MobileVerification from '../screens/Auth/MobileVerfication';
import Login from '../screens/Auth/Login';
import UserOnboarding from '../screens/Onboarding/UserOnboarding';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserOnboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserOnboarding" component={UserOnboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MobileVerification" component={MobileVerification} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="VerifyPasswordReset"
        component={VerifyPasswordReset}
      />
      <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
