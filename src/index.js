
const User               = require('./Components/User/User');
const GetUser            = require('./Components/User/GetUser');
const GetUsersCollection = require('./Collections/GetUsersCollection');
const UserMetaCollection = require('./Collections/UserMetaCollection');
const UsersCollection    = require('./Collections/UsersCollection');
const UserSelector       = require('./Selectors/UserSelector');
const UserMetaSelector   = require('./Selectors/UserMetaSelector');
const UsersActions       = require('./Actions/Creators');
const UsersSaga          = require('./Sagas/UsersSaga');
const GetUsersSaga       = require('./Sagas/Preloaders/GetUsersSaga');
const UsersApi           = require('./Services/UsersApi');
const UsersReducer       = require('./Reducers/UsersReducer');
const UserStatusReducer  = require('./Reducers/UserStatusReducer');
const UserMetaReducer    = require('./Reducers/UserMetaReducer');
const MeetMeReducer      = require('./Reducers/MeetMeReducer');
const RatePhotoReducer   = require('./Reducers/RatePhotoReducer');
const UsersRoutes        = require('./routes');

module.exports = {
  User:                  User.default,
  GetUser:               GetUser.default,
  GetUsersCollection:    GetUsersCollection.default,
  UsersCollection:       UsersCollection.default,
  UserMetaCollection:    UserMetaCollection.default,
  getUsersCollection:    UserSelector.getUsersCollection,
  getUserByUsername:     UserSelector.getUserByUsername,
  getUserById:           UserSelector.getUserById,
  getMeMeta:             UserMetaSelector.getMeMeta,
  UsersActions:          UsersActions.default,
  UsersSaga:             UsersSaga.default,
  GetUsersSaga:          GetUsersSaga.default,
  UsersApi:              UsersApi.default,
  UsersReducer:          UsersReducer.default,
  UserStatusReducer:     UserStatusReducer.default,
  UserMetaReducer:       UserMetaReducer.default,
  MeetMeReducer:         MeetMeReducer.default,
  RatePhotoReducer:      RatePhotoReducer.default,
  UsersRoutes:           UsersRoutes.default
}
