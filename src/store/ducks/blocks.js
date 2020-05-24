import api from '../../utils/api'

export const Types = {
  REQUEST: 'blocks/REQUEST',
  SUCCESS: 'blocks/SUCCESS',
  ERROR: 'blocks/ERROR',
};

const INITIAL_STATE = {
  requesting: false,
  blocks: [],
  error: null
};

export default function blocks(state = INITIAL_STATE, action) {
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
        blocks: action.blocks,
        error: null
      }
    case Types.ERROR:
      return {
        ...state,
        requesting: false,
        blocks: [],
        error: action.error
      }
    default:
      return state
  }
}

export const Creators = {
  getBlocks: () => {
    const request = () => ({ type: Types.REQUEST });
    const success = (blocks) => ({ type: Types.SUCCESS, blocks });
    const failure = (error) => ({ type: Types.ERROR, error });

    return async (dispatch) => {
      dispatch(request())
      try {
        const { data: blocks } = await api.get('blocks')
        dispatch(success(blocks))
      } catch (e) {
        dispatch(failure(e))
      }
    }
  }
};
