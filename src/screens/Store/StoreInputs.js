import React from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { Divider } from 'react-native-paper';
import FAB from '../../components/FAB';
import Button from '../../components/primary/Button';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const StoreInputs = ({ navigation }) => {
  return (
    <Block background>
      <Block space='evenly' paddingHorizontal={SIZES.padding} marginVertical={35} background>
        <Block flex={1}>
          <Button center middle radius={8} white shadow elevation={8} row height={150}>
            <Block column paddingHorizontal={SIZES.padding} paddingVertical={SIZES.padding}>
              <Block space='between' center middle row>
                <Text gray h4>
                  Fertilizer NPK
                </Text>
                <Text black h2>
                  N25, 000
                </Text>
              </Block>
              <Divider />
              <Block marginVertical={8} space='between' column>
                <Text muted small>
                  Pickup Status
                </Text>
                <Text gray h5>
                  Panshi Jos, Monday Jan 09
                </Text>
              </Block>
            </Block>
          </Button>
        </Block>
      </Block>
      <FAB right={15} bottom={35} onPress={() => navigation.navigate('BuyInput')} />
    </Block>
  );
};

export default StoreInputs;
