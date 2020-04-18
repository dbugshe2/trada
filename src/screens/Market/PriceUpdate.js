import React, { useState } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Button from '../../components/primary/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';

const PriceUpdate = () => {
  return (
    <Block background>
      <Header backTitle="Price Update" />
      <Text marginVertical={10} paddingHorizontal={SIZES.padding}>
        Updates are based on a per bag bases - 100kg
      </Text>
      <Block
        space="around"
        marginVertical={SIZES.padding}
        paddingHorizontal={SIZES.padding}
      >
        <Block middle flex={4}>
          <Dropdown defaultValue="Select State" />
          <Dropdown defaultValue="LGA" />
          <Dropdown defaultValue="Select Item" />
          <Block flex={0} space="around" row>
            <Block>
              <Dropdown defaultValue="Min Price" />
            </Block>
            <Block>
              <Dropdown defaultValue="Max Price" />
            </Block>
          </Block>
          <Block marginVertical={50} justifyContent="flex-start">
            <Button>
              <Text white center h6>
                Save
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PriceUpdate;
