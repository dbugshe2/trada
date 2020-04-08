import React from 'react';
import DropdownType from 'react-native-modal-dropdown';
import { COLORS, SIZES } from '../utils/theme';
import Block from './primary/Block';
import Text from './primary/Text';
import { Ionicons } from '@expo/vector-icons';

const Dropdown = (props) => {
  const { flex, containerProps, error } = props;

  const style = {
    borderColor: (error && COLORS.error) || COLORS.gray,
    borderRadius: SIZES.radius,
    height: SIZES.base * 14,
    justifyContent: 'center',
    borderWidth: 1,
  };
  const textStyle = {
    paddingHorizontal: SIZES.padding,
    fontSize: SIZES.h6,
    color: COLORS.muted,
  };
  const dropdownStyle = { width: '50%', height: SIZES.height * 0.3 };
  const dropdownTextStyle = {
    fontSize: SIZES.h6,
    color: COLORS.gray,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.padding,
  };
  const dropdownTextHighlightStyle = {};
  return (
    <Block
      flex={(flex && flex) || 0}
      middle
      marginVertical={SIZES.base}
      {...containerProps}
    >
      <DropdownType
        style={style}
        textStyle={textStyle}
        dropdownStyle={dropdownStyle}
        dropdownTextStyle={dropdownTextStyle}
        dropdownTextHighlightStyle={dropdownTextHighlightStyle}
        {...props}
      />
      <Ionicons
        style={{ position: 'absolute', top: 28, right: 16 }}
        name="md-arrow-dropdown"
        color={COLORS.muted}
        size={15}
      />
      {props.message && (
        <Text small color={COLORS.primary}>
          {props.message}
        </Text>
      )}
    </Block>
  );
};
export default Dropdown;
