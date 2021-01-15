import React from 'react';

import Toast from 'react-native-tiny-toast';
import { COLORS, SIZES } from './theme';
import rgba from '../utils/rgba';

const defaultOptions = {
  duration: Toast.duration.LONG,
  position: Toast.position.BOTTOM,
  containerStyle: { backgroundColor: COLORS.odd },
  maskColor: COLORS.primary,
  textColor: COLORS.gray,
  textStyle: { fontFamily: 'montserratMedium', fontSize: SIZES.small },
};
const loadingOptions = {
  containerStyle: { backgroundColor: COLORS.primary },
  // maskColor: rgba(COLORS.primary, 0.5),
  textColor: COLORS.gray,
  textStyle: { fontFamily: 'montserratMedium', fontSize: SIZES.small },
  position: Toast.position.CENTER,
  duration: 0,
};
const errorOptions = {
  position: Toast.position.BOTTOM,
  containerStyle: { backgroundColor: COLORS.odd },
  maskColor: COLORS.primary,
  textStyle: { fontFamily: 'montserratMedium', fontSize: SIZES.small },
  textColor: COLORS.error,
  duration: Toast.duration.LONG,
};
const successOptions = {
  duration: Toast.duration.SHORT,
  position: Toast.position.CENTER,
  maskColor: COLORS.primary,
  textStyle: { fontFamily: 'montserratMedium', fontSize: SIZES.small },
  containerStyle: { backgroundColor: COLORS.primary },
  textColor: COLORS.white,
};

const toast = (text) => {
  return Toast.show(text, defaultOptions);
};
const errorMessage = (text) => {
  return Toast.show(text, errorOptions);
};
const loadingMessage = (text) => {
  return Toast.showLoading(text, loadingOptions);
};
const successMessage = (text) => {
  return Toast.showSuccess(text, successOptions);
};
const clearMessage = (target) => {
  Toast.hide(target);
};

export { toast, errorMessage, loadingMessage, successMessage, clearMessage };
