import React from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { Divider } from 'react-native-paper';
import FAB from '../../components/FAB';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Text from '../../components/primary/Text';
import Block from '../../components/primary/Block';

const StoreOutputs = ({ navigation }) => {
  return (
    <Block background>
      <Block space='evenly' paddingHorizontal={SIZES.padding} marginVertical={35} background>
        <Block flex={2}>
          <Button
            center
            middle
            radius={8}
            white
            shadow
            elevation={8}
            row
            height={180}
            onPress={() => navigation.navigate('StoreItemSummary')}>
            <Block column paddingHorizontal={SIZES.padding} paddingVertical={SIZES.padding}>
              <Block paddingBottom={25} middle row>
                <Block space='between' column>
                  <Text h2>N25,000</Text>
                  <Text gray h4>
                    Rice Padi
                  </Text>
                </Block>
                <ImageIcon style={{}} name='riceBag' />
              </Block>
              <Divider />
              <Block marginVertical={10} space='between' column>
                <Text muted small>
                  Delivery Status
                </Text>
                <Text gray h6>
                  Ungwan Pama, Kaduna, Tuesday Feb 19
                </Text>
              </Block>
            </Block>
          </Button>
        </Block>
      </Block>
      <FAB right={15} bottom={35} onPress={() => navigation.navigate('SellOutput')} />
    </Block>
  );
};

export default StoreOutputs;
