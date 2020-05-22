import React, { useState } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import { SIZES, COLORS } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { getUser } from '../../utils/asyncstorage';
import { captureException } from '@sentry/react-native';
import { ActivityIndicator } from 'react-native';
import { errorMessage, successMessage } from '../../utils/toast';
import { apiPost } from '../../utils/fetcher';

const ChangePassword = ({ navigation }) => {
  const { validateToken } = useAuthContext();
  const {
    register,
    getValues,
    setValue,
    errors,
    handleSubmit,
    triggerValidation,
  } = useForm();

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [confirmPinError, setConfirmPinError] = useState(null);
  const [sending, setSending] = useState();

  const getUserOtp = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(await getUser());
      setUser(storedUser);
      setOtp(storedUser.resetPinOtp);
    } catch (error) {
      captureException(error);
    }
    setLoading(false);
  };

  const validateConfirmPin = (confirmPin) => {
    let pin = getValues('newPin');
    let validated = pin === confirmPin;
    if (validated && otp !== null) {
      setReady(true);
      setConfirmPinError(null);
    } else {
      setConfirmPinError({
        message: 'This Pin does not match your new Pin above',
      });
    }
  };
  console.log('form state', getValues());
  console.log('errors', errors);
  const verifyOldPin = (oldPin) => {
    // let pin = getValues("newPin")
    if (oldPin.length >= 3) {
      setValue('resetPinOtp', otp);
      setVerified(true);
    }
  };

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiPost('/users/pin/reset', data, token, true)
          .unauthorized((err) => {
            errorMessage('unauthorized: ' + err.json.message);
          })
          .notFound((err) => {
            errorMessage('not found:' + err.json.message);
          })
          .timeout((err) => errorMessage('timeout: ', +err.json.message))
          .error(403, (err) => {
            console.log(err);
            errorMessage('Error: ' + err.json.message);
          })
          .internalError((err) => {
            errorMessage('server Error: ' + err.json.message);
          })
          .fetchError((err) => {
            errorMessage('Network error: ' + err.json.message);
          })
          .json();
        if (res) {
          console.log(res);
          successMessage(res.message);
          navigation.navigate('Home');
        }
        setSending(false);
      }
    } catch (error) {
      setSending(false);
      captureException(error);
    }
  };

  React.useEffect(() => {
    getUserOtp();
  }, []);

  React.useEffect(() => {
    register('newPin', {
      required: 'Please enter a new Pin',
      minLength: { value: 4, message: 'pin must be 4 digits long' },
    });
    register('resetPinOtp', { required: 'Unable to authorise new Pin' });
  }, [register]);

  if (loading) {
    return (
      <Block background middle center>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    );
  }
  return (
    <Block background>
      <Header backTitle="Change Password" />
      <Block flex={1} marginVertical={30} paddingHorizontal={SIZES.padding}>
        <Block flex={0}>
          <Input
            label="Please enter old password"
            onChangeText={verifyOldPin}
            keyboardType="number-pad"
            secureTextEntry
            error={errors.resetPinOtp}
            maxLength={4}
          />
          <Input
            disabled={!verified}
            maxLength={4}
            label="New password"
            onChangeText={(text) => setValue('newPin', text)}
            secureTextEntry
            keyboardType="number-pad"
            error={errors.newPin}
            onBlur={() => triggerValidation('newPin')}
          />
          <Input
            disabled={!verified}
            maxLength={4}
            label="Confirm new password"
            keyboardType="number-pad"
            secureTextEntry
            onChangeText={validateConfirmPin}
            error={confirmPinError}
          />
        </Block>
      </Block>
      <Block paddingHorizontal={30} paddingBottom={10} flex={0}>
        {sending ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Button disabled={!ready} onPress={handleSubmit(onSubmit)}>
            <Text white center h6>
              Confirm
            </Text>
          </Button>
        )}
      </Block>
    </Block>
  );
};

export default ChangePassword;
