import jwtDecode from 'jwt-decode';
import { captureException } from 'sentry-expo';

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

export const isValid = (token) => {
  //  return true if token is still valid
  try {
    const { exp } = jwtDecode(token);
    return exp > Date.now() / 1000;
  } catch (error) {
    captureException(error);
    return null;
  }
};
