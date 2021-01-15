import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { ActivityIndicator } from 'react-native';
import { useAuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { captureException } from '@sentry/react-native';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const Login = ({ navigation }) => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  const { login } = useAuthContext();

  const { register, errors, setValue, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setSending(true);
      await login(data);
    } catch (error) {
      captureException(error);
      setSending(false);
    }
  };
  useEffect(() => {
    register({ name: 'phone' }, { required: 'please enter your phone number' });
    register({ name: 'pin' }, { required: 'please enter your pin number' });
  }, [register]);

  return (
    <Block background>
      <Header backTitle="Log in" />
      <Block flex={0}>
        <Text center secondary>
          {message}
        </Text>
      </Block>
      <Block flex={2} paddingHorizontal={SIZES.padding}>
        <Input
          label="Phone Number"
          maxLength={11}
          onChangeText={(text) => setValue('phone', text)}
          keyboardType="number-pad"
          error={errors.phone}
        />
        <Input
          label="Password"
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(text) => setValue('pin', text)}
          error={errors.pin}
        />
        <Block marginVertical={SIZES.padding}>
          {sending ? (
            <ActivityIndicator animating size="large" color={COLORS.primary} />
          ) : (
            <Button onPress={handleSubmit(onSubmit)}>
              <Text white center h6>
                Log In
              </Text>
            </Button>
          )}
          <Button
            transparent
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text secondary center body>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>

      <Block inactive row flex={0} paddingVertical={SIZES.base} middle center>
        <Text body muted>
          Don’t have an account?
        </Text>
        <Button
          transparent
          marginHorizontal={SIZES.base}
          onPress={() => navigation.navigate('MobileVerification')}
        >
          <Text primary>Register</Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Login;
