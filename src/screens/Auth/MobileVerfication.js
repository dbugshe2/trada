import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { useForm } from 'react-hook-form';
// import { useAuthContext } from "../../context";
import { captureException } from 'sentry-expo';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const MobileVerification = ({ navigation }) => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // const auth = useAuthContext();
  // const { requestOtp } = auth;
  useEffect(() => {
    register({ name: 'phone' }, { required: true, maxLength: 11, minLength: 10 });
  }, [register]);
  const onSubmit = (data) => {
    setLoading(true);
    // requestOtp(data)
    //   .then(res => {
    //     console.log({ ...res });
    //     if (res.status === "success") {
    //       navigation.navigate("VerifyPhoneNumber");
    //     } else {
    //       setMessage(res.message);
    //       setLoading(false);
    //     }
    //   })
    //   .catch(err => {
    //     captureException(err);
    //     setLoading(false);
    //     setMessage({ ...err });
    //     return;
    //   });
  };
  return (
    <Block background>
      <Header backTitle='Mobile Verification' />
      <Block space='around' marginVertical={SIZES.padding} paddingHorizontal={SIZES.padding}>
        <Block middle flex={2}>
          <Input
            label='Phone Number'
            keyboardType='phone-pad'
            onChangeText={(text) => {
              setValue('phone', text);
            }}
            maxLength={11}
          />
          {errors.phone && (
            <Text small color='red'>
              Please enter a valid phone number
            </Text>
          )}
          <Text secondary body>
            {message}
          </Text>
        </Block>
        <Block flex={3} justifyContent='flex-start' marginVertical={SIZES.padding * 2}>
          <Button transparent>
            <Text gray center small>
              By signing up, you confirm that you agree to our
              <Text primary>Terms or Use</Text> and have read and understood our{' '}
              <Text primary>Privacy Policy</Text>. You will receive an SMS to confirm Your phone
              number. SMS fee may apply.
            </Text>
          </Button>
        </Block>
        <Block justifyContent='flex-start'>
          {loading ? (
            <ActivityIndicator animating size='large' color={COLORS.primary} />
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
            onPress={() => navigation.navigate('Register')}>
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
