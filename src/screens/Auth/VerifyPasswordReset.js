import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { captureException } from '@sentry/react-native';
import { useForm } from 'react-hook-form';
import Timer from '../../components/Timer';
import PinInput from '../../components/PinInput';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const VerifyPasswordReset = ({ navigation }) => {
  const { phone, setResetPinOtp, requestResetOtp } = useAuthContext();
  const { register, handleSubmit, setValue } = useForm();

  // const = auth;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setResetPinOtp(data);
      navigation.navigate('ResetPassword');
    } catch (error) {
      captureException(error);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResending(true);
      const res = await requestResetOtp(phone);

      if (res) {
        setMessage('New OTP Sent to phone');
      }
    } catch (error) {
      captureException(error);
      setMessage(error.message);
    } finally {
      setResending(false);
    }
  };
  useEffect(() => {
    register({ name: 'resetPinOtp' }, { required: true, minLength: 4 });
  }, [register]);
  return (
    <Block background>
      <Header backTitle="Enter OTP" />
      <Block
        space="around"
        marginVertical={SIZES.padding}
        paddingHorizontal={SIZES.padding}
      >
        <Block middle center flex={2}>
          <PinInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: '80%' }}
            pinCount={4}
            autoFocusOnLoad
            onCodeChanged={(text) => {
              setValue('resetPinOtp', text);
            }}
          />
          <Text secondary h5>
            {message}
          </Text>
        </Block>
        <Block
          flex={2}
          justifyContent="flex-start"
          marginVertical={SIZES.padding * 2}
        >
          <Text gray center small>
            Enter the 4 digit code we sent to {phone}
          </Text>
          {canResend ? (
            <Button transparent onPress={resendOtp}>
              <Text primary center small>
                Resend code
              </Text>
            </Button>
          ) : (
            <Button transparent>
              {resending ? (
                <Text secondary center small>
                  resending...
                </Text>
              ) : (
                <Text secondary center small>
                  Resend code in{'  '}
                  <Timer
                    onComplete={() => setCanResend(true)}
                    secondary
                    time={{ mins: 10, secs: 0 }}
                  />{' '}
                </Text>
              )}
            </Button>
          )}
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
    </Block>
  );
};

export default VerifyPasswordReset;
