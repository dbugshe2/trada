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
import { commissionReducer } from './commissionReducer';
import { captureException } from 'sentry-expo';
const CommissionContext = createContext();

export const CommissionProvider = (props) => {
  const initialState = {
    commissionWallet: null,
    commissionBalance: null,
    history: [],
    fullHistory: [],
    historyCount: null,
    leaderboard: [],
    showMessage: null,
    message: null,
  };

  const { validateToken } = useAuthContext();

  const [state, dispatch] = useReducer(commissionReducer, initialState || {});

  const getCommissionWallet = async () => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiGet('/commissions/wallet', {}, token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (data) {
          dispatch({
            type: COMMISSION_WALLET_SUCCESS,
            payload: data,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: COMMISSION_WALLET_FAIL,
        payload: error,
      });
      captureException(error);
    }
  };

  const getRecentCommissionHistory = async (limit) => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiGet(
          '/commissions/history',
          { skip: 0, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        console.log(data);
        if (data) {
          dispatch({
            type: COMMISSION_HISTORY_SUCCESS,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: COMMISSION_HISTORY_FAIL,
          payload: 'Sorry, Session Expired log in again to continue',
        });
      }
    } catch (error) {
      captureException(error);
    }
  };

  const getCommissionHistory = async (limit, skip) => {
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiGet(
          '/commissions/history',
          { skip: skip, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        console.log(res);
        if (res) {
          dispatch({
            type: COMMISSION_FULL_HISTORY_SUCCESS,
            payload: res,
          });
        } else {
          console.log(res);
        }
      } else {
        dispatch({
          type: COMMISSION_FULL_HISTORY_FAIL,
          payload: 'Sorry, Session Expired log in again to continue',
        });
      }
    } catch (error) {
      captureException(error);
    }
  };

  const cashOutCommission = async (formData) => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiPost(
          '/commissions/transfer',
          formData,
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (data.status === 'success') {
          console.log('cash out sucessfull', data);
          dispatch({
            type: COMMISSION_TRANSFER_SUCCESS,
            payload: formData.amount,
          });
          return true;
        } else {
          dispatch({
            type: COMMISSION_TRANSFER_FAIL,
            payload: data,
          });
          return false;
        }
      }
    } catch (error) {
      captureException(error);
      return null;
    }
  };

  const getCommissionsLeaderBoard = async (skip, limit) => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiGet(
          '/commissions/leaderboard',
          { skip: skip, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        console.log(data);
        if (data) {
          dispatch({
            type: COMMISSION_LEADERBOARD_SUCCESS,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: COMMISSION_LEADERBOARD_FAIL,
          payload: 'Sorry, Session Expired log in again to continue',
        });
      }
    } catch (error) {
      captureException(error);
    }
  };
  // console.log('commisssion__>>', state);
  const values = useMemo(() => {
    return {
      commissionWallet: state.commissionWallet,
      commissionBalance: state.commissionBalance,
      history: state.history,
      fullHistory: state.fullHistory,
      historyCount: state.historyCount,
      leaderboard: state.leaderboard,
      message: state.message,
      showMessage: state.showMessage,
      getCommissionWallet,
      getCommissionHistory,
      getRecentCommissionHistory,
      getCommissionsLeaderBoard,
      cashOutCommission,
    };
  }, [state]);

  return (
    <CommissionContext.Provider value={values}>
      {props.children}
    </CommissionContext.Provider>
  );
};

export const useCommissionContext = () => {
  const context = React.useContext(CommissionContext);
  if (typeof context === undefined) {
    throw new Error(
      'useCommissionContext must be used within CommissionProvider'
    );
  }

  return context;
};
