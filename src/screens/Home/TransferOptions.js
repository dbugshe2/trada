import React from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const TransferOptions = ({ navigation }) => {
  return (
    <Block scroll background>
      <Header backTitle='Transfer Cash' />
      <Block space='evenly' paddingHorizontal={SIZES.padding}>
        <Block marginVertical={50}>
          <Button
            center
            middle
            radius={8}
            white
            shadow
            elevation={10}
            row
            height={120}
            onPress={() => navigation.navigate('TransferCash')}>
            <Block
              paddingHorizontal={SIZES.padding}
              paddingVertical={SIZES.padding * 2}
              middle
              row
              center>
              <Block flex={2} column>
                <Text h2>Tmoni account</Text>
                <Text left gray body>
                  Transfer cash to your Tmoni account for free
                </Text>
              </Block>

              <Block flex={1} />
              <ImageIcon style={{}} name='avatar' />
            </Block>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default TransferOptions;
