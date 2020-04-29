import React from 'react';
import { SIZES, LINE_HEIGHTS, LETTERSPACING } from '../utils/theme';
import Block from './primary/Block';
import ImageIcon from './primary/ImageIcon';
import { NumberFormatter } from '../utils/currency';
import Text from './primary/Text';

const LeaderboardItem = (props) => {
  const { id, coins, name } = props;
  return (
    <Block
      row
      middle
      center
      marginVertical={20}
      paddingHorizontal={SIZES.padding}
    >
      <Text muted paddingRight={8}>
        {id}
      </Text>
      <Block flex={4}>
        <Text
          mtmedium
          spacing={LETTERSPACING.point_25}
          height={LINE_HEIGHTS.twenty}
          gray
          h6
        >
          {name}
        </Text>
      </Block>
      <Block center>
        <ImageIcon absolute top={2} bottom={2} right={0} name="coin" />
      </Block>
      <Block flex={0}>
        <Text
          mtmedium
          spacing={LETTERSPACING.point_25}
          height={LINE_HEIGHTS.twenty}
          gray
          h6
          right
        >
          {coins > 0 ? NumberFormatter(coins) : `${'\u20A6'}0`}
        </Text>
      </Block>
    </Block>
  );
};

export default LeaderboardItem;
