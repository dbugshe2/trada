import React, {
  createContext,
  useReducer,
  useMemo,
  useState,
  useContext,
} from 'react';
import { useAuthContext } from '../auth/AuthContext';

import {
  COMMISSION_WALLET_SUCCESS,
  COMMISSION_WALLET_FAIL,
  COMMISSION_HISTORY_SUCCESS,
  COMMISSION_HISTORY_FAIL,
  COMMISSION_FULL_HISTORY_SUCCESS,
  COMMISSION_FULL_HISTORY_FAIL,
  COMMISSION_LEADERBOARD_SUCCESS,
  COMMISSION_LEADERBOARD_FAIL,
  COMMISSION_TRANSFER_SUCCESS,
  COMMISSION_TRANSFER_FAIL,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';
import { COLORS } from '../../utils/theme';
import { apiGet, apiPost } from '../../utils/fetcher';

export const CommissionContext = createContext();

export const CommissionProvider = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case COMMISSION_WALLET_SUCCESS:
      case COMMISSION_WALLET_FAIL:
      case COMMISSION_HISTORY_SUCCESS:
      case COMMISSION_HISTORY_FAIL:
      case COMMISSION_FULL_HISTORY_SUCCESS:
      case COMMISSION_FULL_HISTORY_FAIL:
      case COMMISSION_LEADERBOARD_SUCCESS:
      case COMMISSION_LEADERBOARD_FAIL:
      case COMMISSION_TRANSFER_SUCCESS:
      case COMMISSION_TRANSFER_FAIL:
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
    <CommissionContext.Provider value={values}>
      {props.children}
    </CommissionContext.Provider>
  );
};
