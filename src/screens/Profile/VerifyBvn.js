import React, { useState } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';

import { SIZES } from '../../utils/theme';

const VerifyBvn = () => {
  return (
    <Block background>
      <Block flex={1} marginVertical={30} paddingHorizontal={SIZES.padding}>
        <Block flex={0}>
          <Input defaultValue="BVN" />
        </Block>
      </Block>
      <Block paddingHorizontal={30} paddingBottom={10} flex={0}>
        <Button>
          <Text white center h6>
            Verify
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default VerifyBvn;
