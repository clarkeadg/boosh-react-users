import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  photo: {},
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {

  return state.merge({
    attempting: false,
    errorCode: null,
    photo: action.payload
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_RATEPHOTO_REQUEST]: attempt,
  [Types.GET_RATEPHOTO_SUCCESS]: success,
  [Types.GET_RATEPHOTO_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
