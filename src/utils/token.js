import jwtDecode from 'jwt-decode';
import { captureException } from '@sentry/react-native';

export const decode = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    captureException(err);
    return null;
  }
};

export const getExpiry = (token) => {
  // return exp field
  try {
    return jwtDecode(token).exp;
  } catch (error) {
    captureException(error);
    return null;
  }
};

export const isValid = (token = null) => {
  //  return true if token is still valid
  try {
    if (typeof token !== 'undefined' && token !== null) {
      const { exp } = jwtDecode(token);
      return exp > Date.now() / 1000;
    }
    return null;
  } catch (error) {
    captureException(error);
    return null;
  }
};
