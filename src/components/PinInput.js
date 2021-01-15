import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../utils/theme';
const PinInput = (props) => {
  // https://github.com/tttstudios/react-native-otp-input
  return (
    <OTPInputView
      codeInputFieldStyle={styles.borderStyleBase}
      codeInputHighlightStyle={styles.borderStyleHighLighted}
      {...props}
    />
  );
};

export default PinInput;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 55,
    height: 55,
    borderRadius: SIZES.btnRadius,
    fontSize: SIZES.h2,
    color: COLORS.muted,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
