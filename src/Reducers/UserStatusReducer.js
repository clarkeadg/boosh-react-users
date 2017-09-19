import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  time: null,
  mail: null,
  views: null,
  notifications: null,
  errorCode: null,
  attempting: false
})

// request
const attempt = (state, action) =>
  state.merge({ attempting: true })

// recieve
const success = (state, action) => {
  //console.log('USER REDUCER SUCCESS',action.payload.entities.users)

  return state.merge({
    attempting: false,
    errorCode: null,
    time: action.payload.time,
    mail: action.payload.mail,
    views: action.payload.views,
    notifications: action.payload.notifications
  })
}

// failure
const failure = (state, action) =>
  state.merge({ attempting: false, errorCode: action.errorCode })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.GET_USER_STATUS_REQUEST]: attempt,
  [Types.GET_USER_STATUS_SUCCESS]: success,
  [Types.GET_USER_STATUS_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
