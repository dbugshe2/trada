import React, { createContext, useReducer, useMemo, useState } from 'react';
import { setUserToken, getUserToken } from '../../utils/asyncstorage';
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
import { apiGet, apiPost } from '../../utils/fetcher';
import { variationReducer } from './variationReducer';

const VariationContext = createContext();

export const VariationProvider = (props) => {
  const initialState = {
    states_and_lgas: null,
    states: null,
    lgas: null,
    banks: null,
    bankNames: null,
    message: null,
    showMessage: null,
  };
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(variationReducer, initialState || {});

  const getStatesDetails = async () => {
    try {
      setLoading(true);
      const res = await apiGet('/variation/states_and_lga')
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        dispatch({
          type: GET_STATES_AND_LGAS_SUCCESS,
          payload: res,
        });
      }
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      captureException(error);
      return error;
    }
  };

  const getStates = () => {
    try {
      setLoading(true);
      const statesList = state.states_and_lgas.map((curStateObj) => {
        return curStateObj.name;
      });
      dispatch({
        type: GET_STATES_SUCCESS,
        payload: statesList,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      captureException(error);
    }
  };

  console.log(state);
  const getBanks = async () => {
    try {
      setLoading(true);
      const res = await apiGet('/variation/banks')
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        console.log(res.data);
        const names = Object.values(res.data);
        console.log('names', names);
        dispatch({
          type: GET_BANKS_SUCCESS,
          payload: [res, names],
        });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      captureException(error);
    }
  };
  const resolveBankAcc = async (code, number) => {
    try {
      const res = await apiPost('/variation/banks/resolve', {
        bankCode: code,
        bankAccount: number,
      })
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Netwrok error', err))
        .json();
      if (res) {
        return res;
      }
    } catch (error) {
      captureException(error);
    }
  };
  const values = useMemo(() => {
    return {
      states_and_lgas: state.states_and_lgas,
      states: state.states,
      lgas: state.lgas,
      banks: state.banks,
      bankNames: state.bankNames,
      message: state.message,
      showMessage: state.showMessage,
      loading,
      getStatesDetails,
      getStates,
      getBanks,
      resolveBankAcc,
    };
  }, [state, loading]);

  return (
    <VariationContext.Provider value={values}>
      {props.children}
    </VariationContext.Provider>
  );
};

export const useVariationContext = () => {
  const context = React.useContext(VariationContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useVariationContext must be used within VariationProvider'
    );
  }
  return context;
};
