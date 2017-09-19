// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export default createTypes(`

  GET_USERS_REQUEST
  GET_USERS_SUCCESS
  GET_USERS_FAILURE

  UPDATE_USERS_REQUEST
  UPDATE_USERS_SUCCESS
  UPDATE_USERS_FAILURE

  GET_USER_STATUS_REQUEST
  GET_USER_STATUS_SUCCESS
  GET_USER_STATUS_FAILURE

  GET_USER_META_REQUEST
  GET_USER_META_SUCCESS
  GET_USER_META_FAILURE

  GET_MEETME_REQUEST
  GET_MEETME_SUCCESS
  GET_MEETME_FAILURE

  GET_RATEPHOTO_REQUEST
  GET_RATEPHOTO_SUCCESS
  GET_RATEPHOTO_FAILURE

  ADD_USER_META_REQUEST
  ADD_USER_META_FAILURE

`)
