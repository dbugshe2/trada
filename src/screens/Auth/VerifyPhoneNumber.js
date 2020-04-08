import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
// import { useAuthContext } from "../../context";
import { captureException } from 'sentry-expo';
import { useForm } from 'react-hook-form';
import PinInput from '../../components/PinInput';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const VerifyPhoneNumber = ({ navigation }) => {
  // const auth = useAuthContext();
  const { register, handleSubmit, setValue } = useForm();

  // const { phone, verifyOtp } = auth;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    // verifyOtp(data)
    //   .then((res) => {
    //     if (res.status === "success") {
    //       navigation.navigate("Register");
    //     } else {
    //       setMessage(res.message);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setMessage(err.message);
    //     captureException(err);
    //     setLoading(false);
    //     return;
    //   });
  };
  useEffect(() => {
    register({ name: 'verifyPhoneOtp' }, { required: true, minLength: 4 });
  }, [register]);
  return (
    <Block background>
      <Header backTitle='Verify Phone Number' />
      <Block space='around' marginVertical={SIZES.padding} paddingHorizontal={SIZES.padding}>
        <Block middle center flex={2}>
          <PinInput
            style={{ width: '80%' }}
            pinCount={4}
            autoFocusOnLoad
            onCodeChanged={(text) => {
              setValue('verifyPhoneOtp', text);
            }}
          />
          <Text secondary h5>
            {message}
          </Text>
        </Block>
        <Block flex={2} justifyContent='flex-start' marginVertical={SIZES.padding * 2}>
          <Button transparent>
            <Text gray center small>
              We sent a text message to --phone-- with your verification code
            </Text>
          </Button>
          <Button transparent>
            <Text secondary center small>
              Resend code in 09:23
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
    </Block>
  );
};

export default VerifyPhoneNumber;
