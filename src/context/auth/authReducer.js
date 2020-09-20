import {
  FORGOT_PIN_FAIL,
  PIN_RESET_FAIL,
  PIN_RESET_SUCCESS,
  SET_RESET_PIN_OTP,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFY_OTP_SUCCESS,
  VERIFY_AUTH_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_AUTH_FAIL,
  USER_DETAILS,
  SET_TOKEN,
  OTP_SUCCESS,
  OTP_FAIL,
  FORGOT_PIN_SUCCESS,
  LOGOUT,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';

export function authReducer(state, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        // isAuthenticated: true,
        // user: action.payload.data,
      };
    case REGISTER_FAIL:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.access_token,
        user: action.payload.data,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        userDetails: null,
        phone: null,
        profileImage: null,
        showMessage: true,
      };
    case VERIFY_OTP_SUCCESS:
    case VERIFY_OTP_FAIL:
    case VERIFY_AUTH_SUCCESS:
    case VERIFY_AUTH_FAIL:
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
        // phone: action.payload.phone,
        showMessage: true,
        isAuthenticated: true,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case OTP_SUCCESS:
      return {
        ...state,
        phone: action.payload,
      };
    case OTP_FAIL:
    case FORGOT_PIN_SUCCESS:
      return {
        ...state,
        phone: action.payload,
      };
    case FORGOT_PIN_FAIL:
    case PIN_RESET_SUCCESS:
    case PIN_RESET_FAIL:
    case SET_RESET_PIN_OTP:
      return {
        ...state,
        resetPinOtp: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        userDetails: null,
        phone: null,
        profileImage: null,
        message: action.payload,
        showMessage: true,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
        showMessage: false,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.payload,
        showMessage: true,
      };
    default:
      return state;
  }
}
