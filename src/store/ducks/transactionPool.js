import api from '../../utils/api'

export const Types = {
  REQUEST: 'transactionPool/REQUEST',
  SUCCESS: 'transactionPool/SUCCESS',
  ERROR: 'transactionPool/ERROR',
};

const INITIAL_STATE = {
  requesting: false,
  error: null,
  transactionPoolMap: {},
};

export default function transactionPool(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return {
        ...state,
        requesting: true
      }
    case Types.SUCCESS:
      return {
        ...state,
        requesting: false,
        error: null,
        transactionPoolMap: action.data
      }
    case Types.ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error
      }
    default:
      return state
  }
}

export const Creators = {
  getTransactionPoolMap: () => {
    const request = () => ({ type: Types.REQUEST });
    const success = (data) => ({ type: Types.SUCCESS, data });
    const failure = (error) => ({ type: Types.ERROR, error });

    return async (dispatch) => {
      dispatch(request())
      try {
        const { data } = await api.get('transaction-pool-map')
        dispatch(success(data))
      } catch (e) {
        dispatch(failure(e))
      }
    }
  }
};
