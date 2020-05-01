import React, { useState } from 'react';
import { Image } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { Divider } from 'react-native-paper';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
// import Card from '../../components/primary/Card';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useFocusEffect } from '@react-navigation/native';
import EmptyState from '../../components/EmptyState';
import moment from 'moment';
import { CurrencyFormatter } from '../../utils/currency';

const StoreItemSummary = ({ route, navigation }) => {
  const [output, setOutput] = useState(null);

  // effects
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        setOutput(JSON.parse(route.params.outputItem));
      }
    }, [route.params])
  );
  console.log(output);

  return (
    <Block background>
      <Header backTitle="Summary" />
      <Block paddingHorizontal={SIZES.padding} marginTop={30}>
        {output ? (
          <Block>
            {/* pic */}
            <Block flex={0} row paddingHorizontal={10}>
              <Block center middle>
                <Image
                  source={{ uri: output.outputImageUrl }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 120, height: 120 }}
                />
              </Block>
              <Block middle h5 marginLeft={23}>
                <Text gray mtmedium h3>
                  {output.outputName}
                </Text>
                <Text muted h6>
                  {output.description}
                </Text>
              </Block>
            </Block>
            {/* end */}
            {/* text section */}
            <Block flex={0} marginVertical={18}>
              <Text body muted>
                {`Reference No. ${output.outputReference} `}
              </Text>
              <Text body muted>
                {moment(output.initiatedAt).format('dddd MMM DD, YYYY')}
              </Text>
            </Block>
            {/* end */}
            <Block outlined white marginTop={SIZES.padding}>
              <Block>
                <Block
                  paddingHorizontal={SIZES.padding}
                  center
                  space="between"
                  row
                >
                  <Text muted body>
                    Location
                  </Text>
                  <Text gray body>
                    {`${output.lga}, ${output.state}`}
                  </Text>
                </Block>
                <Block
                  paddingHorizontal={SIZES.padding}
                  center
                  lightgray
                  space="between"
                  row
                >
                  <Text muted body>
                    Item
                  </Text>
                  <Text gray body>
                    {output.outputName}
                  </Text>
                </Block>
                <Block
                  paddingHorizontal={SIZES.padding}
                  center
                  space="between"
                  row
                >
                  <Text muted body>
                    Qty
                  </Text>
                  <Text gray body>
                    {output.units}
                  </Text>
                </Block>
                <Block
                  paddingHorizontal={SIZES.padding}
                  center
                  lightgray
                  space="between"
                  row
                >
                  <Text muted body>
                    Estimated
                  </Text>
                  <Text gray body>
                    {CurrencyFormatter(output.estimatedAmount)}
                  </Text>
                </Block>
                <Block
                  paddingHorizontal={SIZES.padding}
                  center
                  space="between"
                  row
                >
                  <Text muted body>
                    Pickup Location
                  </Text>
                  <Text gray body>
                    {output.outputPickupLocation}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        ) : (
          <EmptyState
            icon="add"
            text="Unable to load Item Summary, Try Again"
          />
        )}
      </Block>
    </Block>
  );
};

export default StoreItemSummary;
