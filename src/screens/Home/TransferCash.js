import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useAuthContext } from '../../context/auth/AuthContext';
import Toast from 'react-native-tiny-toast';
import { captureException } from '@sentry/react-native';
import { apiPost, apiGet } from '../../utils/fetcher';
import {
  loadingMessage,
  clearMessage,
  errorMessage,
  successMessage,
} from '../../utils/toast';
import BANKS from '../../constants/banks';
const TransferCash = ({ navigation }) => {
  //state
  const [sending, setSending] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [ready, setReady] = useState(false);
  const [activeBankCode, setActiveBankCode] = useState(null);
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [banks, setBanks] = useState(BANKS);
  const [bankNames, setBankNames] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, setValue, handleSubmit, errors } = useForm();

  const { validateToken } = useAuthContext();
  const getBanks = async () => {
    try {
      setLoading(true);
      const names = Object.values(BANKS);
      names.sort();
      setBanks(BANKS);
      setBankNames(names);
    } catch (error) {
      setLoading(false);
      errorMessage('Something Went wrong, Try again later');
      captureException(error);
    } finally {
      setLoading(false);
    }
  };
  const resolveBankAcc = async (code, number) => {
    try {
      const res = await apiPost('/variation/banks/resolve', {
        bankCode: code,
        bankAccount: number,
      })
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        return res;
      }
    } catch (error) {
      captureException(error);
    }
  };
  // handlers
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const handleBankSelected = (id, name) => {
    setActiveBankCode(getKeyByValue(banks, name));
    setValue('bankCode', activeBankCode);
    setValue('bankName', name);
  };
  const handleAccNumber = async () => {
    const fetching = loadingMessage('Fetching Account Details...');
    try {
      const details = await resolveBankAcc(activeBankCode, accNumber);
      if (details) {
        clearMessage(fetching);
        setAccName((oldAccName) => {
          setValue('accountName', details.data.account_name);
          return details.data.account_name;
        });
        setValue('accountNumber', accNumber);
        setReady(true);
      }
    } catch (error) {
      clearMessage(fetching);
      captureException(error);
    } finally {
      clearMessage(fetching);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      await getBanks();
    };
    bootstrap();
  }, []);

  useEffect(() => {
    register('bankName', { required: 'please select a bank' });
    register('bankCode');
    register('accountNumber', { required: 'please enter an account number' });
    register('accountName');
    register('phone', { required: 'please enter recipients phone number' });
    register('amount', { required: 'please enter an amount to transfer' });
    register('narration', {
      required: 'please enter a narration for the transfer',
    });
  }, [register]);

  const onSubmit = async (data) => {
    console.log(data);
    setSending(true);
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiPost('/wallet/withdraw', data, token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => {
            errorMessage(err.json.message);
          })
          .timeout((err) => {
            console.log('timeout', err);
            errorMessage('Timeout, Transfer Failed Due to Poor Network');
          })
          .internalError((err) => {
            console.log('server Error', err);
            errorMessage(err.json.message);
          })
          .fetchError((err) => {
            errorMessage('Transfer Failed, Check Your Conection');
            console.log('Netwrok error', err);
          })
          .json();
        console.log(res);
        if (res) {
          successMessage(`${data.amount} sent to ${data.accountName}`);
        }
      }
      setSending(false);
    } catch (error) {
      errorMessage(`An error occurred, ${error.message}`);
      console.log(error);
      setSending(false);
      captureException(error);
    } finally {
      navigation.navigate('TransferOptions');
    }
  };

  if (loading) {
    return (
      <Block background center middle>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </Block>
    );
  }

  return (
    <Block background>
      <Header backTitle="Transfer Cash" />
      <Block>
        <Block scroll paddingHorizontal={SIZES.padding}>
          <Text mtmedium gray small marginVertical={10}>
            Transfer funds to your Tmoni account
          </Text>
          <Block middle>
            <Block scroll>
              <Dropdown
                options={bankNames}
                defaultValue={'Select Bank'}
                onSelect={handleBankSelected}
                error={errors.bankName}
              />
              <Input
                keyboardType="number-pad"
                label="Account Number"
                maxLength={10}
                onChangeText={(text) => setAccNumber(text)}
                onBlur={handleAccNumber}
                error={errors.accountNumber}
              />
              <Input
                value={accName}
                disabled
                label="Account Name"
                error={errors.accName}
              />
              <Input
                disabled={!ready}
                keyboardType="phone-pad"
                label="Phone Number"
                onChangeText={(text) => setValue('phone', text)}
                error={errors.phone}
              />
              <Input
                disabled={!ready}
                keyboardType="number-pad"
                label="Amount"
                onChangeText={(text) => setValue('amount', text)}
                error={errors.amount}
              />
              <Input
                disabled={!ready}
                label="Narration"
                onChangeText={(text) => setValue('narration', text)}
                error={errors.narration}
              />
            </Block>
          </Block>
          <Block>
            {sending ? (
              <ActivityIndicator size="small" />
            ) : (
              <Button onPress={handleSubmit(onSubmit)}>
                <Text white center h6>
                  Transfer
                </Text>
              </Button>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default TransferCash;
