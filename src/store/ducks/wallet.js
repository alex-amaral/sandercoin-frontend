import api from '../../utils/api'

export const Types = {
  REQUEST: 'wallet/REQUEST',
  SUCCESS: 'wallet/SUCCESS',
  ERROR: 'wallet/ERROR'
};

const INITIAL_STATE = {
  requesting: false,
  walletInfo: null,
  error: null
};

export default function walletInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return {
        ...state,
        requesting: true
      };
    case Types.SUCCESS:
      return {
        ...state,
        requesting: false,
        walletInfo: action.walletInfo,
        error: null
      };
    case Types.ERROR:
      return {
        ...state,
        requesting: false,
        walletInfo: null,
        error: action.error
      };
    default:
      return state
  }
}

export const Creators = {
  getWalletInfo: () => {
    const request = () => ({ type: Types.REQUEST })
    const success = (walletInfo) => ({ type: Types.SUCCESS, walletInfo })
    const failure = (error) => ({ type: Types.ERROR, error })

    return async (dispatch) => {
      dispatch(request())

      try {
        const { data: walletInfo } = await api.get('wallet-info')
        dispatch(success(walletInfo))
      } catch (e) {
        dispatch(failure(e))
      }

    }
  }
};
