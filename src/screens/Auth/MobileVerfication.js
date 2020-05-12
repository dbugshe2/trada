import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/auth/AuthContext';
import { captureException } from '@sentry/react-native';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { toast, errorMessage } from '../../utils/toast';
const MobileVerification = ({ navigation }) => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { requestOtp } = useAuthContext();
  useEffect(() => {
    register(
      { name: 'phone' },
      { required: true, maxLength: 11, minLength: 10 }
    );
  }, [register]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await requestOtp(data);
      if (res) {
        navigation.navigate('VerifyPhoneNumber');
      }
    } catch (error) {
      errorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Block background>
      <Header backTitle="Mobile Verification" />
      <Block
        space="around"
        marginVertical={SIZES.padding}
        paddingHorizontal={SIZES.padding}
      >
        <Block middle flex={2}>
          <Input
            label="Phone Number"
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setValue('phone', text);
            }}
            maxLength={11}
          />
          {errors.phone && (
            <Text small color="red">
              Please enter a valid phone number
            </Text>
          )}
          <Text secondary body>
            {message}
          </Text>
        </Block>
        <Block flex={3} marginVertical={SIZES.padding * 2}>
          <Button transparent>
            <Text gray center small>
              By signing up, you confirm that you agree to our
              <Text primary>Terms or Use</Text> and have read and understood our{' '}
              <Text primary>Privacy Policy</Text>. You will receive an SMS to
              confirm Your phone number. SMS fee may apply.
            </Text>
          </Button>
        </Block>
        <Block>
          {loading ? (
            <ActivityIndicator animating size="large" color={COLORS.primary} />
          ) : (
            <Button onPress={handleSubmit(onSubmit)}>
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
            Already verified your phone number?
          </Text>
          <Button
            marginHorizontal={SIZES.base}
            transparent
            onPress={() => navigation.navigate('Register')}
          >
            <Text body primary>
              Register
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default MobileVerification;
