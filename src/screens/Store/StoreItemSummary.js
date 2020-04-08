import React, { useState } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { Divider } from 'react-native-paper';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Card from '../../components/primary/Card';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const StoreItemSummary = ({ navigation }) => {
  return (
    <Block background>
      <Header backTitle='Summary' />
      <Block paddingHorizontal={SIZES.padding} marginVertical={30}>
        <Block column>
          {/* pic */}
          <Block flex={0} row paddingHorizontal={10}>
            <Block center middle>
              <ImageIcon name='riceBag' width={180} height={100} />
            </Block>
            <Block paddingHorizontal={16}>
              <Text h3>Rice Padi</Text>
              <Text muted h6>
                Freshly harvested rice padi
              </Text>
            </Block>
          </Block>
          {/* end */}
          {/* text section */}
          <Block flex={0} marginVertical={18}>
            <Text body muted>
              Reference No. T2U93992882
            </Text>
            <Text body muted>
              Monday Jan 09, 2020
            </Text>
          </Block>
          {/* end */}
          <Block marginVertical={25} flex={0.8}>
            <Card outlined white>
              <Block paddingHorizontal={SIZES.padding} marginVertical={20}>
                <Block space='between' row>
                  <Text muted h6>
                    Location
                  </Text>
                  <Text gray h6>
                    Panshi, Jos
                  </Text>
                </Block>
                <Block space='between' row>
                  <Text muted h6>
                    Item
                  </Text>
                  <Text gray h6>
                    Rice Padi
                  </Text>
                </Block>
                <Block space='between' row>
                  <Text muted h6>
                    Qty
                  </Text>
                  <Text gray h6>
                    50
                  </Text>
                </Block>
                <Block space='between' row>
                  <Text muted h6>
                    Estimated
                  </Text>
                  <Text gray h6>
                    N80, 000
                  </Text>
                </Block>
                <Block space='between' row>
                  <Text muted h6>
                    Pickup Location
                  </Text>
                  <Text gray h6>
                    Plateau Jos
                  </Text>
                </Block>
              </Block>
            </Card>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default StoreItemSummary;
