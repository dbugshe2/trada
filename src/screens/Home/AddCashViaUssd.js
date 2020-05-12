import React, { useState } from 'react';
import { SIZES } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { KeyboardAvoidingView } from 'react-native';
import Input from '../../components/primary/Input';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const AddCashViaUssd = () => {
  const { userDetails } = useAuthContext();

  const [amount, setAmount] = useState('');

  const renderUssdCode = (bankName, ussdCodeTemplate) => (
    <Block marginVertical={20}>
      <Text gray h6 mtmedium transform="uppercase">
        {bankName}
      </Text>
      <Text mtmedium primary small>
        {ussdCodeTemplate}
      </Text>
    </Block>
  );

  return (
    <Block background marginTop={SIZES.padding}>
      <Block paddingHorizontal={SIZES.padding} flex={0}>
        <KeyboardAvoidingView behavior="padding">
          <Input
            keyboardType="numeric"
            clearTextOnFocus
            onChangeText={(text) => setAmount(text)}
            label="Enter Amount"
            value={amount}
          />
        </KeyboardAvoidingView>
      </Block>
      <Block scroll paddingHorizontal={SIZES.padding * 2}>
        <Text paddingVertical={30} muted>
          Make a USSD transfer into your Trada wallet by selecting Providus Bank
          as destination bank
        </Text>

        <Block space="evenly">
          {renderUssdCode(
            'access bank',
            `*901*1*${amount}*${userDetails.wallet.accountNumber}#`
          )}
          {renderUssdCode(
            'diamond bank',
            ` *426*${amount}*${userDetails.wallet.accountNumber}#`
          )}
          {renderUssdCode(
            'fcmb',
            `*329*${amount}*${userDetails.wallet.accountNumber}#`
          )}
          {renderUssdCode(
            'fidelity bank',
            `*770*${userDetails.wallet.accountNumber}*${amount}#`
          )}
          {renderUssdCode(
            'first bank',
            `*894*${amount}*${userDetails.wallet.accountNumber}#`
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default AddCashViaUssd;
