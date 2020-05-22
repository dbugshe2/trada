import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { captureException } from '@sentry/react-native';
import { useForm } from 'react-hook-form';
import PinInput from '../../components/PinInput';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { errorMessage, successMessage } from '../../utils/toast';
import Timer from '../../components/Timer';

const VerifyPhoneNumber = ({ navigation }) => {
  const { phone, verifyOtp, requestOtp } = useAuthContext();
  const { register, handleSubmit, setValue } = useForm();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState({ mins: 10, secs: 0 });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await verifyOtp(data)
        .notFound((err) => {
          errorMessage(err.json.message);
        })
        .timeout((err) => {
          console.log('timeout', err);
          errorMessage('Timeout: ' + err.json.message);
        })
        .internalError((err) => {
          console.log('server Error', err);
          errorMessage('Error: ' + err.json.message);
        })
        .error(406, (err) => {
          errorMessage('Error: ' + err.json.message);
        })
        .fetchError((err) => {
          errorMessage('Network Error, Check Your Conection');
          console.log('Network error', err);
        })
        .json();
      if (res) {
        successMessage('Phone Number Verified');
        navigation.navigate('Register');
      }
    } catch (error) {
      setLoading(false);
      captureException(error);
    }
  };

  const resendOtp = async () => {
    try {
      setResending(true);
      const res = await requestOtp({ phone: phone });

      if (res) {
        successMessage('New OTP Sent to phone');
        setTimer({ mins: 10, secs: 0 });
        setCanResend(false);
      }
    } catch (error) {
      captureException(error);
      setMessage(error.message);
      setResending(false);
    } finally {
      setResending(false);
    }
  };
  useEffect(() => {
    register({ name: 'verifyPhoneOtp' }, { required: true, minLength: 4 });
  }, [register]);
  return (
    <Block background>
      <Header backTitle="Verify Phone Number" />
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
              setValue('verifyPhoneOtp', text);
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
          {/* <Button transparent> */}
          <Text gray center small>
            We sent a text message to {phone} with your verification code
          </Text>
          {/* </Button> */}
          {canResend ? (
            <Button transparent onPress={resendOtp}>
              <Text primary center small>
                Resend code
              </Text>
            </Button>
          ) : (
            <Button transparent>
              {!resending ? (
                <Text secondary center small>
                  Resend code in{' '}
                  <Timer
                    onComplete={() => setCanResend(true)}
                    secondary
                    time={timer}
                  />{' '}
                </Text>
              ) : (
                <Text secondary center small>
                  Resending...
                </Text>
              )}
            </Button>
          )}
        </Block>
        <Block justifyContent="flex-start">
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

export default VerifyPhoneNumber;
