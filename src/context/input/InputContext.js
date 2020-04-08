import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';

import {
  GET_ALL_INPUT_SUCCESS,
  GET_ALL_INPUT_FAIL,
  GET_ONE_INPUT_SUCCESS,
  GET_ONE_INTPUT_FAIL,
  GET_INPUT_LOCATION_SUCCESS,
  GET_INPUT_LOCATION_FAIL,
  BUY_INPUT_SUCCESS,
  BUY_INPUT_FAIL,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';

import { COLORS } from '../../utils/theme';
import { apiGet, apiPost } from '../../utils/fetcher';

export const InputContext = createContext();

export const InputProvider = (prop) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_ALL_INPUT_SUCCESS:
      case GET_ALL_INPUT_FAIL:
      case GET_ONE_INPUT_SUCCESS:
      case GET_ONE_INTPUT_FAIL:
      case GET_INPUT_LOCATION_SUCCESS:
      case GET_INPUT_LOCATION_FAIL:
      case BUY_INPUT_SUCCESS:
      case BUY_INPUT_FAIL:
      case CLEAR_MESSAGE:
        return {
          ...state,
          message: null,
          showMessage: false,
        };
      default:
        return state;
    }
  }, initialState || {});

  const values = useMemo(() => {
    return {
      message: state.message,
      showMessage: state.showMessage,
    };
  }, [state]);

  return (
    <InputContext.Provider value={values}>
      {props.children}
    </InputContext.Provider>
  );
};
