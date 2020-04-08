import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';

import {
  GET_OUTPUT_SUCCESS,
  GET_OUTPUT_FAIL,
  GET_ONE_OUTPUT_SUCCESS,
  GET_ONE_OUTPUT_FAIL,
  SELL_OUTPUT_SUCCESS,
  SELL_OUTPUT_FAIL,
  ADD_PRICE_SUCCESS,
  ADD_PRICE_FAIL,
  GET_MARKET_PRICE_SUCCESS,
  GET_MARKET_PRICE_FAIL,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';

import { COLORS } from '../../utils/theme';
import { apiGet, apiPost } from '../../utils/fetcher';

export const OutputContext = createContext();

export const OutputProvider = (prop) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_OUTPUT_SUCCESS:
      case GET_OUTPUT_FAIL:
      case GET_ONE_OUTPUT_SUCCESS:
      case GET_ONE_OUTPUT_FAIL:
      case SELL_OUTPUT_SUCCESS:
      case SELL_OUTPUT_FAIL:
      case ADD_PRICE_SUCCESS:
      case ADD_PRICE_FAIL:
      case GET_MARKET_PRICE_SUCCESS:
      case GET_MARKET_PRICE_FAIL:
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
    <OutputContext.Provider value={values}>
      {props.children}
    </OutputContext.Provider>
  );
};
