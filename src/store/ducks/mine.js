import api from '../../utils/api'

export const Types = {
  REQUEST: 'mine/REQUEST',
  SUCCESS: 'mine/SUCCESS',
  ERROR: 'mine/ERROR',
};

const INITIAL_STATE = {
  requesting: false,
  error: null,
};

export default function mine(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return {
        ...state,
        requesting: true,
        success: undefined,
      }
    case Types.SUCCESS:
      return {
        ...state,
        requesting: false,
        error: null,
        success: true,
      }
    case Types.ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
        success: undefined,
      }
    default:
      return state
  }
}

export const Creators = {
  mineTransaction: () => {
    const request = () => ({ type: Types.REQUEST });
    const success = () => ({ type: Types.SUCCESS });
    const failure = (error) => ({ type: Types.ERROR, error });

    return async (dispatch) => {
      dispatch(request())
      try {
        await api.get('mine-transactions')
        dispatch(success())
      } catch (e) {
        dispatch(failure(e))
      }
    }
  }
};
