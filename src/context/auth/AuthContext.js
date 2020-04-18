import React, { useMemo, useReducer, useState, createContext } from 'react';
import {
  getUserToken,
  getUser,
  setUserToken,
  setUser,
  removeUser,
  removeUserToken,
} from '../../utils/asyncstorage';
import { captureException } from 'sentry-expo';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  OTP_SUCCESS,
  OTP_FAIL,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAIL,
  FORGOT_PIN_SUCCESS,
  FORGOT_PIN_FAIL,
  PIN_RESET_SUCCESS,
  PIN_RESET_FAIL,
  SET_RESET_PIN_OTP,
  SET_TOKEN,
  LOGOUT,
  USER_DETAILS,
  CLEAR_MESSAGE,
} from '../types';
import { COLORS } from '../../utils/theme';
import Text from '../../components/primary/Text';
import { apiGet, apiPost, apiPut } from '../../utils/fetcher';
import { isValid } from '../../utils/token';
import { authReducer } from './authReducer';
import { toast, errorMessage } from '../../utils/toast';
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true);

  const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    phone: null,
    userDetails: null,
    resetPinOtp: null,
    message: null,
    showMessage: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState || {});

  const requestOtp = async (formData) => {
    try {
      const res = await apiPost('/users/phone/otp', formData).json();
      if (res) {
        dispatch({
          type: OTP_SUCCESS,
          payload: formData.phone,
        });
        return res;
      }
    } catch (error) {
      errorMessage(error.message);
      captureException(error);
    }
  };

  const verifyOtp = async (formData) => {
    try {
      const res = await apiPost('/users/phone/otp/confirm', formData).json();
      if (res) {
        dispatch({
          type: VERIFY_OTP_SUCCESS,
        });
        return res;
      }
    } catch (error) {
      errorMessage(error.message);
      captureException(error);
    }
  };

  const setUserDetails = (formData) => {
    dispatch({
      type: USER_DETAILS,
      payload: formData,
    });
  };

  const signup = async (formData) => {
    try {
      const res = await apiPost('/users/onboarding', formData).json();
      if (res) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        return res;
      }
    } catch (error) {
      errorMessage(error.message);
      console.log(error);
      captureException(error);
    }
  };

  const fetchUserDetails = async (token) => {
    // return userDetails response or null
    console.log('Fetching User Details..');
    // check definition and wretch docs
    return apiGet('/users/find', {}, token, true)
      .json()
      .then((data) => {
        console.log('data from fetchuserdta', data);
        return data;
      });
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await apiPost('/users/login', formData).json();
      console.log('login res..', data);
      if (typeof data !== undefined && data !== null) {
        await setUserToken(data.access_token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });

        const user = await fetchUserDetails(data.access_token);
        console.log('getting that user..');
        errorMessage('getting that user..');
        if (user !== null) {
          await setUser(JSON.stringify(user));
          dispatch({
            type: USER_DETAILS,
            payload: user,
          });
          setLoading(false);
        } else {
          console.log('fetching user failed during login');
        }
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log('login err', err);
      errorMessage(err.message);
      captureException(err);
      setLoading(false);
    }
  };

  const verifyLogin = async () => {
    try {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        // user found valid
        const userData = await getUser();

        if (userData !== null) {
          // successfully fetched user data
          dispatch({ type: USER_DETAILS, payload: JSON.parse(userData) });
          dispatch({ type: SET_TOKEN, payload: token });
          setLoading(false);
        } else {
          // something went wrong fetching user data
          console.log('Unable to fetch user data');
          setLoading(false);
        }
      } else {
        // await logout('');
        setLoading(false);
      }
    } catch (error) {
      errorMessage(error.message);
      captureException(error);
      setLoading(false);
    }
  };

  const requestResetOtp = async (formData) => {
    try {
      const res = await apiPost('/users/pin/forgot', formData).json();
      if (res) {
        dispatch({
          type: FORGOT_PIN_SUCCESS,
          payload: formData.phone,
        });
        return res;
      }
    } catch (error) {
      errorMessage(error.message);
      console.log(error);
      captureException(error);
    }
  };

  const setResetPinOtp = (formData) => {
    dispatch({
      type: SET_RESET_PIN_OTP,
      payload: formData.resetPinOtp,
    });
  };

  const resetPin = async (formData) => {
    try {
      const res = await apiPost('/users/pin/reset', {
        resetPinOtp: state.resetPinOtp,
        newPin: formData.newPin,
      }).json();
      if (res) {
        dispatch({
          type: PIN_RESET_SUCCESS,
          payload: res.status,
        });
        return res;
      }
    } catch (error) {
      errorMessage(error.message);
      console.log(error);
      captureException(error);
    }
  };

  const logout = async (message = "You've been logged out Successfully") => {
    try {
      // setLoading(true);
      await removeUserToken();
      await removeUser();
      dispatch({ type: LOGOUT });
      setLoading(false);
      toast(message);
    } catch (err) {
      errorMessage(err.message);
      console.log(err);
      captureException(err);
      // setLoading(false);
    }
  };

  const validateToken = async () => {
    try {
      const token = await getUserToken();
      if (token !== null) {
        if (isValid(token)) {
          return token;
        } else {
          await logout('Session Expired, log in to continue');
          return null;
        }
      } else {
        await logout('sessions Expired, log in to continue');
        errorMessage('what the fuck');
        return null;
      }
    } catch (error) {
      errorMessage(error.message);
      console.log(error);
      captureException(error);
      return null;
    }
  };

  const values = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      userDetails: state.userDetails,
      phone: state.phone,
      resetPinOtp: state.resetPinOtp,
      message: state.message,
      showMessage: state.showMessage,
      loading: loading,
      requestOtp,
      verifyOtp,
      setUserDetails,
      signup,
      fetchUserDetails,
      login,
      verifyLogin,
      requestResetOtp,
      setResetPinOtp,
      resetPin,
      logout,
      validateToken,
    };
  }, [state, loading]);

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (typeof context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
