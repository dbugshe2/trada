import React, { createContext, useReducer, useMemo, useState } from 'react';
import { setUserToken, getUserToken } from '../../utils/AsyncStorage';
import { captureException } from 'sentry-expo';
import {
  GET_STATES_SUCCESS,
  GET_STATES_FAIL,
  GET_STATES_AND_LGAS_FAIL,
  GET_STATES_AND_LGAS_SUCCESS,
  GET_LGAS_FAIL,
  GET_LGAS_SUCCESS,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAIL,
  RESOLVE_BANK_ACCOUNTS_SUCCESS,
  RESOLVE_BANK_ACCOUNTS_FAIL,
} from '../types';
import { apiGet } from '../../utils/fetcher';

export const VariationContext = createContext();

export const VariationProvider = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_STATES_AND_LGAS_SUCCESS:
      case GET_STATES_AND_LGAS_FAIL:
      case GET_STATES_SUCCESS:
      case GET_STATES_FAIL:
      case GET_LGAS_SUCCESS:
      case GET_LGAS_FAIL:
      case GET_BANKS_SUCCESS:
      case GET_BANKS_FAIL:
      case RESOLVE_BANK_ACCOUNTS_SUCCESS:
      case RESOLVE_BANK_ACCOUNTS_FAIL:
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
    <VariationContext.Provider value={values}>
      {props.children}
    </VariationContext.Provider>
  );
};
