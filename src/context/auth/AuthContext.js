import React, { useMemo, useReducer, useState, createContext } from 'react';
import {
  getUserToken,
  getUser,
  setUserToken,
  setUser,
  removeUser,
  removeUserToken,
} from '../../utils/asyncstorage';
import { captureException } from '@sentry/react-native';
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
import { errorMessage, toast } from '../../utils/toast';

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
        .unauthorized((err) => errorMessage('unauthorized', err.json.message))
        .notFound((err) => errorMessage('not found', err.json.message))
        .timeout((err) => errorMessage('timeout', err.json.message))
        .error(403, (err) => {
          console.log(err);
          errorMessage('this user exist please login instead');
        })
        .internalError((err) => errorMessage('server Error', err.json.message))
        .fetchError((err) => errorMessage('Network error'))
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
      return null;
    }
  };

  const verifyOtp = async (formData) => {
    try {
      const res = await apiPost('/users/phone/otp/confirm', formData)
        .unauthorized((err) => {
          errorMessage('unauthorized: ' + err.json.message);
        })
        .notFound((err) => {
          errorMessage('not found: ' + err.json.message);
        })
        .timeout((err) => errorMessage('timeout: ' + err.json.message))
        .error(403, (err) => {
          console.log(err);
          errorMessage('Error: ' + err.json.message);
        })
        .internalError((err) => {
          errorMessage('server Error: ' + err.json.message);
        })
        .fetchError((err) => {
          errorMessage('Network error');
        })
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
      return null;
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
        .unauthorized((err) => {
          errorMessage('unauthorized: ' + err.json.message);
        })
        .notFound((err) => {
          errorMessage('not found:' + err.json.message);
        })
        .timeout((err) => errorMessage('timeout: ', +err.json.message))
        .error(403, (err) => {
          console.log(err);
          errorMessage('Error: ' + err.json.message);
        })
        .error(406, (err) => {
          console.log(err);
          errorMessage('Error: ' + err.json.message);
        })
        .internalError((err) => {
          errorMessage('server Error: ' + err.json.message);
        })
        .fetchError((err) => {
          errorMessage('Network error');
        })
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
      .fetchError((err) => console.log('Network error', err))
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
        .notFound((err) => {
          errorMessage(err.json.message);
          dispatch({
            type: LOGIN_FAIL,
          });
        })
        .timeout((err) => {
          console.log('timeout', err);
          errorMessage('Timeout, Login Failed Due to Poor Network');
          dispatch({
            type: LOGIN_FAIL,
          });
        })
        .internalError((err) => {
          console.log('server Error', err);
          errorMessage(err.json.message);
          dispatch({
            type: LOGIN_FAIL,
          });
        })
        .fetchError((err) => {
          errorMessage('Login Failed, Check Your Conection');
          console.log('Network error', err);
          dispatch({
            type: LOGIN_FAIL,
          });
        })
        .json();
      if (data) {
        // console.log('login res..', data);
        await setUserToken(data.access_token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });

        const user = await fetchUserDetails(data.access_token);
        if (user !== null) {
          await setUser(JSON.stringify(user.data));
          dispatch({
            type: USER_DETAILS,
            payload: user.data,
          });
          toast('Welcome back ' + user.data.firstName);
          setLoading(false);
        } else {
          console.log('fetching user failed during login');
        }
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        setLoading(false);
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log('login err', err);
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
        .fetchError((err) => console.log('Network error', err))
        .json();
      if (res) {
        dispatch({
          type: FORGOT_PIN_SUCCESS,
          payload: formData.phone,
        });
        return res;
      }
    } catch (error) {
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
      })
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Network error', err))
        .json();
      if (res) {
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
        await logout('welcome');
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
