import {
  GET_STATES_AND_LGAS_FAIL,
  GET_STATES_SUCCESS,
  GET_STATES_AND_LGAS_SUCCESS,
  GET_STATES_FAIL,
  GET_LGAS_SUCCESS,
  GET_LGAS_FAIL,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAIL,
  RESOLVE_BANK_ACCOUNTS_SUCCESS,
  RESOLVE_BANK_ACCOUNTS_FAIL,
} from '../types';

export function variationReducer(state, action) {
  switch (action.type) {
    case GET_STATES_AND_LGAS_SUCCESS:
      return {
        ...state,
        states_and_lgas: action.payload.data,
      };
    case GET_STATES_AND_LGAS_FAIL:
      return {
        ...state,
        message: action.payload.message,
        showMessage: true,
      };
    case GET_STATES_SUCCESS:
      return {
        ...state,
        states: action.payload,
      };
    case GET_STATES_FAIL:
      return {
        ...state,
        message: action.payload.message,
        showMessage: true,
      };
    case GET_LGAS_SUCCESS:
      return {
        ...state,
        lgas: action.payload,
      };
    case GET_LGAS_FAIL:
      return {
        ...state,
        message: action.payload.message,
        showMessage: true,
      };
    case GET_BANKS_SUCCESS:
      return {
        ...state,
        banks: action.payload[0].data,
        bankNames: action.payload[1],
      };
    case GET_BANKS_FAIL:
    case RESOLVE_BANK_ACCOUNTS_SUCCESS:
    case RESOLVE_BANK_ACCOUNTS_FAIL:
    default:
      return state;
  }
}
