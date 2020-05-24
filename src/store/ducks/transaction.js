import api from '../../utils/api'

export const Types = {
  REQUEST: 'transaction/REQUEST',
  SUCCESS: 'transaction/SUCCESS',
  ERROR: 'transaction/ERROR',
};

const INITIAL_STATE = {
  requesting: false,
  error: null
};

export default function transaction(state = INITIAL_STATE, action) {
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
        error: null
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
  createTransaction: ({ recipient, amount }) => {
    const request = () => ({ type: Types.REQUEST });
    const success = () => ({ type: Types.SUCCESS });
    const failure = (error) => ({ type: Types.ERROR, error });

    return async (dispatch) => {
      dispatch(request())
      try {
        const payload = { recipient, amount }
        await api.post('transact', payload)
        dispatch(success())
      } catch (e) {
        dispatch(failure(e))
      }
    }
  }
};
