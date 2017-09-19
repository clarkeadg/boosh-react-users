import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  user: {},
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {

  return state.merge({
    user: action.payload,
    attempting: false,
    errorCode: null  
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_MEETME_REQUEST]: attempt,
  [Types.GET_MEETME_SUCCESS]: success,
  [Types.GET_MEETME_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
