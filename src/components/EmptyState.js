import React from 'react';
import Block from './primary/Block';
import Text from './primary/Text';
import ImageIcon from './primary/ImageIcon';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS, SIZES } from '../utils/theme';

const EmptyState = (props) => {
  const { text, icon, loading } = props;
  return (
    <Block center middle background>
      {loading ? (
        <ActivityIndicator color={COLORS.primary} />
      ) : (
        <>
          <ImageIcon name={(icon && icon) || 'add'} />
          <Text muted center mtmedium small marginVertical={SIZES.padding}>
            {text}
          </Text>
        </>
      )}
    </Block>
  );
};

export default EmptyState;
