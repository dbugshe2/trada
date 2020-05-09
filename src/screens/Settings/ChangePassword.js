import React, { useState } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';

const ChangePassword = () => {
  return (
    <Block background>
      <Header backTitle="Change Password" />
      <Block flex={1} marginVertical={30} paddingHorizontal={SIZES.padding}>
        <Block flex={0}>
          {/* <Input label="Please enter old password"/> */}
          <Input label="New password" />
          <Input label="Confirm new password" />
        </Block>
      </Block>
      <Block paddingHorizontal={30} paddingBottom={10} flex={0}>
        <Button>
          <Text white center h6>
            Confirm
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default ChangePassword;
