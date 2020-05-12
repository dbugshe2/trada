import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageIcon from './primary/ImageIcon';
import Text from './primary/Text';
import Block from './primary/Block';
import { SIZES } from '../utils/theme';

const BackButton = ({ backTitle }) => {
  const navigation = useNavigation();
  return (
    <Block row center>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: SIZES.padding }}
      >
        <ImageIcon name="back" />
      </TouchableOpacity>
      <Text black backTitle>
        {backTitle && backTitle}
      </Text>
    </Block>
  );
};

export default BackButton;
