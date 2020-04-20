import React from 'react';
import { SIZES } from '../../utils/theme';
import Dropdown from '../../components/Dropdown';
import ImageIcon from '../../components/primary/ImageIcon';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const SellOutput = () => {
  return (
    <Block background>
      <Header backTitle="Sell Your Outputs" />
      <Text marginVertical={5} paddingHorizontal={SIZES.padding}>
        Place item available for sell
      </Text>
      <Block scroll marginVertical={25} paddingHorizontal={SIZES.padding}>
        <Block marginVertical={8} center middle flex={0} column>
          <Button muted center middle width={80} height={80}>
            <Block center middle>
              <ImageIcon name="add" />
            </Block>
          </Button>
          <Text marginVertical={6} small muted>
            Add image of item
          </Text>
        </Block>
        <Block middle flex={0}>
          <Input label="Description" />
          <Input label="Select State" />
          <Dropdown label="LGA" />
          <Dropdown label="Category" />
          <Block flex={0} space="around" row>
            <Block>
              <Dropdown label="Item" />
              <Text primary small>
                Minimum of 10 item per order
              </Text>
            </Block>
            <Block>
              <Dropdown label="Qty:10" />
            </Block>
          </Block>
          <Input label="Delivery location" />
          <Text primary small>
            Estimated Price:
            <Text black small>
              N8,000 per item
            </Text>
          </Text>
        </Block>
      </Block>
      <Block flex={0}>
        <Button radius={0}>
          <Text white center h6>
            Pay N5,000
          </Text>
        </Button>
      </Block>
      <Block flex={0} top />
    </Block>
  );
};

export default SellOutput;
