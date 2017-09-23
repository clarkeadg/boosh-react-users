'use strict';

var User = require('./Components/User/User');
var GetUser = require('./Components/User/GetUser');
var GetUsersCollection = require('./Collections/GetUsersCollection');
var UsersCollection = require('./Collections/UsersCollection');
var UserMetaCollection = require('./Collections/UserMetaCollection');
var UserMetaSelector = require('./Selectors/UserMetaSelector');
var UsersActions = require('./Actions/Creators');
var UsersSaga = require('./Sagas/UsersSaga');
var GetUsersSaga = require('./Sagas/Preloaders/GetUsersSaga');
var UsersApi = require('./Services/UsersApi');
var UsersReducer = require('./Reducers/UsersReducer');
var UserStatusReducer = require('./Reducers/UserStatusReducer');
var UserMetaReducer = require('./Reducers/UserMetaReducer');
var MeetMeReducer = require('./Reducers/MeetMeReducer');
var RatePhotoReducer = require('./Reducers/RatePhotoReducer');
var UsersRoutes = require('./routes');

module.exports = {
  User: User.default,
  GetUser: GetUser.default,
  GetUsersCollection: GetUsersCollection.default,
  UsersCollection: UsersCollection.default,
  UserMetaCollection: UserMetaCollection.default,
  getUsersCollection: UserSelector.getUsersCollection,
  getUserByUsername: UserSelector.getUserByUsername,
  getUserById: UserSelector.getUserById,
  getMeMeta: UserMetaSelector.getMeMeta,
  UsersActions: UsersActions.default,
  UsersSaga: UsersSaga.default,
  GetUsersSaga: GetUsersSaga.default,
  UsersApi: UsersApi.default,
  UsersReducer: UsersReducer.default,
  UserStatusReducer: UserStatusReducer.default,
  UserMetaReducer: UserMetaReducer.default,
  MeetMeReducer: MeetMeReducer.default,
  RatePhotoReducer: RatePhotoReducer.default,
  UsersRoutes: UsersRoutes.default
};