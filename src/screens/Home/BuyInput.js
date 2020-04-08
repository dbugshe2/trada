import React from 'react';
import { SIZES } from '../../utils/theme';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const BuyInput = () => {
  return (
    <Block background>
      <Header backTitle="Buy Your Inputs" />
      <Text marginVertical={5} paddingHorizontal={SIZES.padding}>
        Transfer funds to your Tmoni account
      </Text>
      <Block marginVertical={25} paddingHorizontal={SIZES.padding}>
        <Block middle flex={0}>
          <Dropdown defaultValue="Select State" />
          <Dropdown defaultValue="LGA" />
          <Dropdown defaultValue="Category" />
          <Block flex={0} space="around" row>
            <Block>
              <Dropdown defaultValue="Category" />
              <Text primary small>
                Minimum of 10 item per order
              </Text>
            </Block>
            <Block>
              <Dropdown defaultValue="Qty:10" />
            </Block>
          </Block>
          <Dropdown defaultValue="Pickup location" />
        </Block>
      </Block>
      <Block flex={0}>
        <Button radius={false}>
          <Text white center h6>
            Pay N27,000
          </Text>
        </Button>
      </Block>
      <Block flex={0} top />
    </Block>
  );
};

export default BuyInput;
