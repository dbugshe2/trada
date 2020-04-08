import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';

import {
  WALLET_SUCCESS,
  WALLET_FAIL,
  WALLET_HISTORY_SUCCESS,
  WALLET_HISTORY_FAIL,
  WALLET_WITHDRAW_SUCCESS,
  WALLET_WITHDRAW_FAIL,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';

import { COLORS } from '../../utils/theme';
import { apiGet, apiPost } from '../../utils/fetcher';

export const WalletContext = createContext();

export const WalletProvider = (prop) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case WALLET_SUCCESS:
      case WALLET_FAIL:
      case WALLET_HISTORY_SUCCESS:
      case WALLET_HISTORY_FAIL:
      case WALLET_WITHDRAW_SUCCESS:
      case WALLET_WITHDRAW_FAIL:
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
    <WalletContext.Provider value={values}>
      {props.children}
    </WalletContext.Provider>
  );
};
