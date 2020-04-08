import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { captureException } from 'sentry-expo';
import { SIZES, COLORS } from '../../utils/theme';
// import { useAuthContext } from '../../context';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Header from '../../components/Header';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';

const ForgotPassword = ({ navigation }) => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // const auth = useAuthContext();
  // const { requestResetOtp } = auth;

  useEffect(() => {
    register(
      { name: 'phone' },
      {
        required: 'please enter your phone number',
        maxLength: { value: 11, message: 'phone number is too short' },
        minLength: {
          value: 10,
          message: 'phone number should be 11 digits or less',
        },
      }
    );
  }, [register]);

  const onSubmit = (data) => {
    setLoading(true);
    // requestResetOtp(data)
    // .then((res) => {
    //   console.log({ ...res });
    //   if (res.status === 'success') {
    //     navigation.navigate('VerifyPasswordReset');
    //   } else {
    //     setMessage(res.message);
    //     setLoading(false);
    //   }
    // })
    // .catch((err) => {
    //   captureException(err);
    //   setLoading(false);
    //   setMessage({ ...err });
    // });
    setLoading(false);
  };

  return (
    <Block background>
      <Header backTitle='Password Reset' />
      <Block space='around' marginVertical={SIZES.padding} paddingHorizontal={SIZES.padding}>
        <Block>
          <Input
            label='Phone Number'
            keyboardType='phone-pad'
            onChangeText={(text) => {
              setValue('phone', text);
            }}
            maxLength={11}
            error={errors.phone}
          />
          <Text secondary small>
            {message}
          </Text>
          <Text gray small>
            Please enter phone number to reset your password
          </Text>
        </Block>
        <Block middle>
          {loading ? (
            <ActivityIndicator animating size='large' color={COLORS.primary} />
          ) : (
            <Button onPress={() => navigation.navigate('VerifyPasswordReset')}>
              <Text white center h6>
                Continue
              </Text>
            </Button>
          )}
        </Block>
      </Block>
      <Block flex={0} inactive center paddingVertical={SIZES.base}>
        <Block flex={0} row middle center>
          <Text muted body center>
            Already have an account?
          </Text>
          <Button
            marginHorizontal={SIZES.base}
            transparent
            onPress={() => navigation.navigate('Login')}>
            <Text body primary>
              Log In
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default ForgotPassword;
