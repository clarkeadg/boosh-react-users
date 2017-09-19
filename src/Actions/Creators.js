import Types from './Types'

/* USERS */
const getUsersAttempt = (meta) => ({ type: Types.GET_USERS_REQUEST, meta })
const getUsersSuccess = (payload) => ({ type: Types.GET_USERS_SUCCESS, payload })
const getUsersFailure = (errorCode) => ({ type: Types.GET_USERS_FAILURE, errorCode })

const updateUsersAttempt = (meta) => ({ type: Types.UPDATE_USERS_REQUEST, meta })
const updateUsersSuccess = (payload) => ({ type: Types.UPDATE_USERS_SUCCESS, payload })
const updateUsersFailure = (errorCode) => ({ type: Types.UPDATE_USERS_FAILURE, errorCode })

/* USER STATUS */
const getUserStatusAttempt = (meta) => ({ type: Types.GET_USER_STATUS_REQUEST, meta })
const getUserStatusSuccess = (payload) => ({ type: Types.GET_USER_STATUS_SUCCESS, payload })
const getUserStatusFailure = (errorCode) => ({ type: Types.GET_USER_STATUS_FAILURE, errorCode })

/* USER META */
const getUserMetaAttempt = (meta) => ({ type: Types.GET_USER_META_REQUEST, meta })
const getUserMetaSuccess = (payload) => ({ type: Types.GET_USER_META_SUCCESS, payload })
const getUserMetaFailure = (errorCode) => ({ type: Types.GET_USER_META_FAILURE, errorCode })

const addUserMetaAttempt = (meta) => ({ type: Types.ADD_USER_META_REQUEST, meta })
const addUserMetaFailure = (errorCode) => ({ type: Types.ADD_USER_META_FAILURE, errorCode })

/* MEET ME */
const getMeetMeAttempt = (meta) => ({ type: Types.GET_MEETME_REQUEST, meta })
const getMeetMeSuccess = (payload) => ({ type: Types.GET_MEETME_SUCCESS, payload })
const getMeetMeFailure = (errorCode) => ({ type: Types.GET_MEETME_FAILURE, errorCode })

/* RATEP HOTO */
const getRatePhotoAttempt = (meta) => ({ type: Types.GET_RATEPHOTO_REQUEST, meta })
const getRatePhotoSuccess = (payload) => ({ type: Types.GET_RATEPHOTO_SUCCESS, payload })
const getRatePhotoFailure = (errorCode) => ({ type: Types.GET_RATEPHOTO_FAILURE, errorCode })

/**
 Makes available all the action creators we've created.
 */
export default {

  getUsersAttempt,
  getUsersSuccess,
  getUsersFailure,

  updateUsersAttempt,
  updateUsersSuccess,
  updateUsersFailure,

  getUserStatusAttempt,
  getUserStatusSuccess,
  getUserStatusFailure,

  getUserMetaAttempt,
  getUserMetaSuccess,
  getUserMetaFailure,

  addUserMetaAttempt,
  addUserMetaFailure,

  getMeetMeAttempt,
  getMeetMeSuccess,
  getMeetMeFailure,

  getRatePhotoAttempt,
  getRatePhotoSuccess,
  getRatePhotoFailure
}
