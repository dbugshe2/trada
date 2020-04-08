import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';

import {
  GET_AGENT_FARMER_SUCCESS,
  GET_AGENT_FARMER_FAIL,
  ADD_FARMER_SUCCESS,
  ADD_FARMER_FAIL,
  CLEAR_MESSAGE,
  SHOW_MESSAGE,
} from '../types';

import { COLORS } from '../../utils/theme';
import { apiGet, apiPost } from '../../utils/fetcher';

export const FarmerContext = createContext();

export const FarmerProvider = (prop) => {
  const initialState = {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_AGENT_FARMER_SUCCESS:
      case GET_AGENT_FARMER_FAIL:
      case ADD_FARMER_SUCCESS:
      case ADD_FARMER_FAIL:
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
    <FarmerContext.Provider value={values}>
      {props.children}
    </FarmerContext.Provider>
  );
};
