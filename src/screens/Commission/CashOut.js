import React, { useEffect, useState } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiPost } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';
import { successMessage } from '../../utils/toast';

const CashOut = ({ navigation }) => {
  const { validateToken } = useAuthContext();

  const { register, setValue, handleSubmit, errors } = useForm();
  const [sending, setSending] = useState(false);

  const cashOutCommission = async (formData) => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiPost(
          '/commissions/transfer',
          formData,
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Network error', err))
          .json();
        if (data) {
          successMessage(`${formData.amount} cash out successful`);
          return true;
        }
      }
    } catch (error) {
      captureException(error);
      return null;
    }
  };

  useEffect(() => {
    register({ name: 'amount' }, { required: 'please enter an amount' });
  }, [register]);
  const onSubmit = async (data) => {
    setSending(true);
    const done = await cashOutCommission(data);
    if (done) {
      navigation.navigate('Commission');
    }
    setSending(false);
  };
  return (
    <Block background>
      <Header backTitle />
      <Block paddingHorizontal={SIZES.padding}>
        <Text h4 gray mtregular>
          How much do you want to cash out? 💰
        </Text>
        <Block>
          <Input
            error={errors.amount}
            onChangeText={(text) => setValue('amount', text)}
            keyboardType="number-pad"
            label="Enter Amount"
          />
        </Block>
        <Block>
          {sending ? (
            <ActivityIndicator animating color={COLORS.primary} size="large" />
          ) : (
            <Button onPress={handleSubmit(onSubmit)}>
              <Text center white h6>
                Cash out
              </Text>
            </Button>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default CashOut;
