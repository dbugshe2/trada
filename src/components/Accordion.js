import React from 'react';
import Block from './primary/Block';
import Text from './primary/Text';
import ImageIcon from './primary/ImageIcon';
import Button from './primary/Button';
import { Divider } from 'react-native-paper';
import { LINE_HEIGHTS, COLORS } from '../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Accordion = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <Block marginVertical={10}>
      <Button onPress={toggleExpand} white height={'100%'}>
        <Block
          row
          center
          style={{ borderBottomWidth: 0.5, borderColor: COLORS.muted }}
        >
          <Text mtmedium body gray>
            {data.title}
          </Text>
          <Block style={{ flexDirection: 'row-reverse' }}>
            <Ionicons
              size={28}
              name={(expanded && 'ios-arrow-up') || 'ios-arrow-down'}
              color={COLORS.muted}
            />
          </Block>
        </Block>
        {expanded && (
          <Block marginVertical={10}>
            <Text small mtmedium muted height={LINE_HEIGHTS.sixteen}>
              {data.body}
            </Text>
          </Block>
        )}
      </Button>
    </Block>
  );
};

export default Accordion;
