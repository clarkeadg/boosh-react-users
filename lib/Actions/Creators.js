'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* USERS */
var getUsersAttempt = function getUsersAttempt(meta) {
  return { type: _Types2.default.GET_USERS_REQUEST, meta: meta };
};
var getUsersSuccess = function getUsersSuccess(payload) {
  return { type: _Types2.default.GET_USERS_SUCCESS, payload: payload };
};
var getUsersFailure = function getUsersFailure(errorCode) {
  return { type: _Types2.default.GET_USERS_FAILURE, errorCode: errorCode };
};

var updateUsersAttempt = function updateUsersAttempt(meta) {
  return { type: _Types2.default.UPDATE_USERS_REQUEST, meta: meta };
};
var updateUsersSuccess = function updateUsersSuccess(payload) {
  return { type: _Types2.default.UPDATE_USERS_SUCCESS, payload: payload };
};
var updateUsersFailure = function updateUsersFailure(errorCode) {
  return { type: _Types2.default.UPDATE_USERS_FAILURE, errorCode: errorCode };
};

/* USER STATUS */
var getUserStatusAttempt = function getUserStatusAttempt(meta) {
  return { type: _Types2.default.GET_USER_STATUS_REQUEST, meta: meta };
};
var getUserStatusSuccess = function getUserStatusSuccess(payload) {
  return { type: _Types2.default.GET_USER_STATUS_SUCCESS, payload: payload };
};
var getUserStatusFailure = function getUserStatusFailure(errorCode) {
  return { type: _Types2.default.GET_USER_STATUS_FAILURE, errorCode: errorCode };
};

/* USER META */
var getUserMetaAttempt = function getUserMetaAttempt(meta) {
  return { type: _Types2.default.GET_USER_META_REQUEST, meta: meta };
};
var getUserMetaSuccess = function getUserMetaSuccess(payload) {
  return { type: _Types2.default.GET_USER_META_SUCCESS, payload: payload };
};
var getUserMetaFailure = function getUserMetaFailure(errorCode) {
  return { type: _Types2.default.GET_USER_META_FAILURE, errorCode: errorCode };
};

var addUserMetaAttempt = function addUserMetaAttempt(meta) {
  return { type: _Types2.default.ADD_USER_META_REQUEST, meta: meta };
};
var addUserMetaFailure = function addUserMetaFailure(errorCode) {
  return { type: _Types2.default.ADD_USER_META_FAILURE, errorCode: errorCode };
};

/* MEET ME */
var getMeetMeAttempt = function getMeetMeAttempt(meta) {
  return { type: _Types2.default.GET_MEETME_REQUEST, meta: meta };
};
var getMeetMeSuccess = function getMeetMeSuccess(payload) {
  return { type: _Types2.default.GET_MEETME_SUCCESS, payload: payload };
};
var getMeetMeFailure = function getMeetMeFailure(errorCode) {
  return { type: _Types2.default.GET_MEETME_FAILURE, errorCode: errorCode };
};

/* RATEP HOTO */
var getRatePhotoAttempt = function getRatePhotoAttempt(meta) {
  return { type: _Types2.default.GET_RATEPHOTO_REQUEST, meta: meta };
};
var getRatePhotoSuccess = function getRatePhotoSuccess(payload) {
  return { type: _Types2.default.GET_RATEPHOTO_SUCCESS, payload: payload };
};
var getRatePhotoFailure = function getRatePhotoFailure(errorCode) {
  return { type: _Types2.default.GET_RATEPHOTO_FAILURE, errorCode: errorCode };
};

/**
 Makes available all the action creators we've created.
 */
exports.default = {

  getUsersAttempt: getUsersAttempt,
  getUsersSuccess: getUsersSuccess,
  getUsersFailure: getUsersFailure,

  updateUsersAttempt: updateUsersAttempt,
  updateUsersSuccess: updateUsersSuccess,
  updateUsersFailure: updateUsersFailure,

  getUserStatusAttempt: getUserStatusAttempt,
  getUserStatusSuccess: getUserStatusSuccess,
  getUserStatusFailure: getUserStatusFailure,

  getUserMetaAttempt: getUserMetaAttempt,
  getUserMetaSuccess: getUserMetaSuccess,
  getUserMetaFailure: getUserMetaFailure,

  addUserMetaAttempt: addUserMetaAttempt,
  addUserMetaFailure: addUserMetaFailure,

  getMeetMeAttempt: getMeetMeAttempt,
  getMeetMeSuccess: getMeetMeSuccess,
  getMeetMeFailure: getMeetMeFailure,

  getRatePhotoAttempt: getRatePhotoAttempt,
  getRatePhotoSuccess: getRatePhotoSuccess,
  getRatePhotoFailure: getRatePhotoFailure
};