import {
  COMMISSION_WALLET_SUCCESS,
  COMMISSION_WALLET_FAIL,
  COMMISSION_FULL_HISTORY_FAIL,
  COMMISSION_FULL_HISTORY_SUCCESS,
  COMMISSION_LEADERBOARD_SUCCESS,
  COMMISSION_TRANSFER_SUCCESS,
  COMMISSION_LEADERBOARD_FAIL,
  COMMISSION_TRANSFER_FAIL,
  CLEAR_MESSAGE,
  COMMISSION_HISTORY_SUCCESS,
  COMMISSION_HISTORY_FAIL,
} from '../types';

export function commissionReducer(state, action) {
  switch (action.type) {
    case COMMISSION_WALLET_SUCCESS:
      return {
        ...state,
        commissionWallet: action.payload.data,
        commissionBalance: action.payload.data.balance,
      };
    case COMMISSION_WALLET_FAIL:
    case COMMISSION_HISTORY_SUCCESS:
      return {
        ...state,
        history: [...action.payload.data],
      };
    case COMMISSION_HISTORY_FAIL:
    case COMMISSION_FULL_HISTORY_SUCCESS:
      return {
        ...state,
        fullHistory: [...state.fullHistory, ...action.payload.data],
        historyCOunt: action.payload.totalDocumentCount,
      };
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
}
