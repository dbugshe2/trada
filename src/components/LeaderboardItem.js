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
      <Block>
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
      <ImageIcon name="coin" />
      <Text
        mtmedium
        spacing={LETTERSPACING.point_25}
        height={LINE_HEIGHTS.twenty}
        gray
        paddingLeft={6}
        h6
      >
        {NumberFormatter(coins)}
      </Text>
    </Block>
  );
};

export default LeaderboardItem;
