import React, { useState } from 'react';
import { SIZES } from '../../utils/theme';
// import { useAuthContext } from "../../context/index";
import { KeyboardAvoidingView } from 'react-native';
import Input from '../../components/primary/Input';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const AddCashViaUssd = () => {
  // const auth = useAuthContext();

  // const { userDetails } = auth;
  const [amount, setAmount] = useState('');
  return (
    <Block background paddingHorizontal={SIZES.padding}>
      <KeyboardAvoidingView behavior="padding">
        <Input
          keyboardType="numeric"
          clearTextOnFocus
          onChangeText={(text) => setAmount(text)}
          label="Enter Amount"
          // value={amount}
        />
      </KeyboardAvoidingView>
      <Block scroll paddingHorizontal={SIZES.padding * 2}>
        <Text paddingVertical={30} muted>
          Make a USSD transfer into your Trada wallet by selecting Providus Bank
          as destination bank
        </Text>

        <Block space="evenly">
          <Block>
            <Text gray h6>
              ACCESS BANK
            </Text>
            <Text mtmedium primary small>
              {/* *901*1*{amount}*{userDetails.wallet.accountNumber}# */}
            </Text>
          </Block>

          <Block marginVertical={20}>
            <Text gray h6>
              DIAMOND BANK
            </Text>
            <Text mtmedium primary small>
              {/* *426*{amount}*{userDetails.wallet.accountNumber}# */}
            </Text>
          </Block>

          <Block>
            <Text gray h6>
              FCMB
            </Text>
            <Text mtmedium primary small>
              {/* *329*{amount}*{userDetails.wallet.accountNumber}# */}
            </Text>
          </Block>

          <Block marginVertical={20}>
            <Text gray h6>
              FIDELITY BANK
            </Text>
            <Text mtmedium primary small>
              {/* *770*{userDetails.wallet.accountNumber}*{amount}# */}
            </Text>
          </Block>

          <Block>
            <Text gray h6>
              FIRST BANK
            </Text>
            <Text mtmedium primary small>
              {/* *894*{amount}*{userDetails.wallet.accountNumber}# */}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default AddCashViaUssd;
