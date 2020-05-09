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
import { errorMessage, successMessage, toast } from '../../utils/toast';

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
      const res = await apiPost('/users/phone/otp', formData)
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) =>
          errorMessage('Unable to complete request ' + err.json.message)
        )
        .timeout((err) => errorMessage('Timeout' + err.json.message))
        .error(403, (err) => {
          errorMessage('this user exist please login instead');
        })
        .internalError((err) =>
          errorMessage('Something went wrong' + err.json.message)
        )
        .fetchError((err) =>
          errorMessage('Network Error, please check your connection')
        )
        .json();
      if (res) {
        console.log(res);
        dispatch({
          type: OTP_SUCCESS,
          payload: formData.phone,
        });
        return res;
      }
    } catch (error) {
      captureException(error);
      return error;
    }
  };

  const verifyOtp = async (formData) => {
    try {
      const res = await apiPost('/users/phone/otp/confirm', formData)
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        dispatch({
          type: VERIFY_OTP_SUCCESS,
        });
        return res;
      }
    } catch (error) {
      console.log(error);
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
      const res = await apiPost('/users/onboarding', formData)
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      captureException(error);
    }
  };

  const fetchUserDetails = async (token) => {
    // return userDetails response or null
    console.log('Fetching User Details..');
    // check definition and wretch docs
    return apiGet('/users/find', {}, token, true)
      .unauthorized((err) => console.log('unauthorized', err))
      .notFound((err) => console.log('not found', err))
      .timeout((err) => console.log('timeout', err))
      .internalError((err) => console.log('server Error', err))
      .fetchError((err) => console.log('Netwrok error', err))
      .json()
      .then((data) => {
        console.log('data from fetchuserdta', data);
        return data;
      })
      .catch((err) => {
        captureException(err);
        return null;
      });
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await apiPost('/users/login', formData)
        .notFound((err) => errorMessage('Something went wrong'))
        .timeout((err) => errorMessage('Login took too long'))
        .internalError((err) => errorMessage('Something went wrong'))
        .fetchError((err) => errorMessage('Network error'))
        .json();
      console.log('login res..', data);
      if (data !== null && typeof data !== undefined) {
        await setUserToken(data.access_token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });

        const user = await fetchUserDetails(data.access_token);
        console.log('getting that user..');
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
      console.log('login err', err);
      captureException(err);
      setLoading(false);
    } finally {
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
        await logout();
        setLoading(false);
      }
    } catch (error) {
      console.log('verify login failed', error);
      captureException(error);
      setLoading(false);
    }
  };

  const requestResetOtp = async (formData) => {
    try {
      const res = await apiPost('/users/pin/forgot', formData)
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        dispatch({
          type: FORGOT_PIN_SUCCESS,
          payload: formData.phone,
        });
        return res;
      }
    } catch (error) {
      console.log(error.json);
      errorMessage(error.json.message);
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
      })
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        successMessage('Pin Reset Successfully');
        dispatch({
          type: PIN_RESET_SUCCESS,
          payload: res.status,
        });
        return res;
      }
    } catch (error) {
      console.log(error);
      captureException(error);
    }
  };

  const logout = async (message = '') => {
    try {
      setLoading(true);
      await removeUserToken();
      await removeUser();
      toast(message);
      dispatch({ type: LOGOUT, payload: message });
      setLoading(false);
    } catch (err) {
      captureException(err);
      setLoading(false);
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
        await logout('Welcome To Trada');
        return null;
      }
    } catch (error) {
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
