import React, { useState } from 'react';
import { SIZES } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const AddCashViaBank = () => {
  const { userDetails } = useAuthContext();

  return (
    <Block background>
      <Block
        scroll
        marginVertical={60}
        marginHorizontal={30}
        paddingHorizontal={SIZES.padding}
      >
        <Text muted>
          Make a bank transfer into the following account to fund your Trada
          wallet
        </Text>

        <Block marginVertical={50}>
          <Block>
            <Text gray h6>
              ACCOUNT NAME
            </Text>
            <Text primary small>
              {userDetails.wallet.accountName}
            </Text>
          </Block>

          <Block marginVertical={20}>
            <Text gray h6>
              ACCOUNT NUMBER
            </Text>
            <Text primary small>
              {userDetails.wallet.accountNumber}
            </Text>
          </Block>

          <Block>
            <Text gray h6>
              BANK NAME
            </Text>
            <Text primary small>
              {userDetails.wallet.bankName}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default AddCashViaBank;
