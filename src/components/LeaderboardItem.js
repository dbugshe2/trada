import React from 'react';
import { SIZES, LINE_HEIGHTS, LETTERSPACING, COLORS } from '../utils/theme';
import Block from './primary/Block';
import ImageIcon from './primary/ImageIcon';
import { NumberFormatter } from '../utils/currency';
import Text from './primary/Text';

const LeaderboardItem = (props) => {
  const { id, coins, user, isUser } = props;
  return (
    <Block
      row
      middle
      center
      marginTop={5}
      paddingVertical={20}
      paddingHorizontal={SIZES.padding}
      secondary={isUser}
    >
      <Text paddingRight={8} color={(isUser && COLORS.white) || COLORS.gray}>
        {id}
      </Text>
      <Block flex={4}>
        <Text
          mtmedium
          spacing={LETTERSPACING.point_25}
          height={LINE_HEIGHTS.twenty}
          color={(isUser && COLORS.white) || COLORS.gray}
          h6
        >
          {user.firstName} {user.lastName}
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
          color={(isUser && COLORS.white) || COLORS.gray}
          h6
          right
        >
          {coins > 0 ? NumberFormatter(coins) : '0'}
        </Text>
      </Block>
    </Block>
  );
};

export default LeaderboardItem;
