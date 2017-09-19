'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Creators = require('../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _normalizr = require('normalizr');

var _booshReactPagination = require('boosh-react-pagination');

var _UserSchema = require('../Schemas/UserSchema');

var _UserSchema2 = _interopRequireDefault(_UserSchema);

var _UserMetaSchema = require('../Schemas/UserMetaSchema');

var _UserMetaSchema2 = _interopRequireDefault(_UserMetaSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SCHEMAS */
exports.default = function (api) {
  var _marked = [attemptGetUsers, watchGetUsersAttempt, watchGetUsersPreloaderAttempt, attemptUpdateUsers, watchUpdateUsersAttempt, attemptGetUserStatus, watchGetUserStatusAttempt, attemptGetUserMeta, watchGetUserMetaAttempt, attemptAddUserMeta, watchAddUserMetaAttempt, attemptGetMeetMe, watchGetMeetMeAttempt, attemptGetRatePhoto, watchGetRatePhotoAttempt].map(_regenerator2.default.mark);

  function attemptGetUsers(meta) {
    var query, path, response, count, data, payload;
    return _regenerator2.default.wrap(function attemptGetUsers$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            //console.log('attemptGetUsers', meta)

            // for takeEvery
            meta = meta.meta;

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/users/";

            // make the call to the api

            _context.next = 5;
            return (0, _effects.call)(api.getUsers, query);

          case 5:
            response = _context.sent;

            if (!(response && response.ok)) {
              _context.next = 18;
              break;
            }

            count = response.data.meta.pagination.total;
            data = response.data.data;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_UserSchema2.default));

            if (!payload.result.length) {
              payload.entities.users = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            //console.log('NORMALIZED DATA', payload)

            _context.next = 16;
            return (0, _effects.put)(_Creators2.default.getUsersSuccess(payload));

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return (0, _effects.put)(_Creators2.default.getUsersFailure(response.data));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  function watchGetUsersAttempt() {
    return _regenerator2.default.wrap(function watchGetUsersAttempt$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _reduxSaga.takeEvery)(_Types2.default.GET_USERS_REQUEST, attemptGetUsers);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this);
  }

  function watchGetUsersPreloaderAttempt() {
    var action, meta;
    return _regenerator2.default.wrap(function watchGetUsersPreloaderAttempt$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.take)(_Types2.default.GET_USERS_REQUEST);

          case 2:
            action = _context3.sent;
            meta = action.meta;
            _context3.next = 6;
            return (0, _effects.call)(attemptGetUsers, { meta: meta });

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked[2], this);
  }

  function attemptUpdateUsers(meta) {
    var query, response;
    return _regenerator2.default.wrap(function attemptUpdateUsers$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = {};

            query.user_id = meta.id;
            if (meta.photo) query.photo = meta.photo;
            if (meta.email) query.email = meta.email;
            if (meta.username) query.username = meta.username;

            // make the call to the api
            _context4.next = 7;
            return (0, _effects.call)(api.updateUsers, meta.id, query);

          case 7:
            response = _context4.sent;


            console.log('UPDATE USERS', response.data);

            _context4.next = 11;
            return (0, _effects.put)(_Creators2.default.getUsersAttempt({
              id: meta.id
            }));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _marked[3], this);
  }

  function watchUpdateUsersAttempt() {
    var _ref, meta;

    return _regenerator2.default.wrap(function watchUpdateUsersAttempt$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 9;
              break;
            }

            _context5.next = 3;
            return (0, _effects.take)(_Types2.default.UPDATE_USERS_REQUEST);

          case 3:
            _ref = _context5.sent;
            meta = _ref.meta;
            _context5.next = 7;
            return (0, _effects.call)(attemptUpdateUsers, meta);

          case 7:
            _context5.next = 0;
            break;

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _marked[4], this);
  }

  function attemptGetUserStatus(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptGetUserStatus$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _effects.call)(api.getUserStatus, meta.id);

          case 2:
            response = _context6.sent;


            console.log('GOT USER STATUS', response.data);

            // success?

            if (!(response && response.ok)) {
              _context6.next = 9;
              break;
            }

            _context6.next = 7;
            return (0, _effects.put)(_Creators2.default.getUserStatusSuccess(response.data));

          case 7:
            _context6.next = 11;
            break;

          case 9:
            _context6.next = 11;
            return (0, _effects.put)(_Creators2.default.getUserStatusFailure(response.data));

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _marked[5], this);
  }

  function watchGetUserStatusAttempt() {
    var _ref2, _meta;

    return _regenerator2.default.wrap(function watchGetUserStatusAttempt$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!true) {
              _context7.next = 9;
              break;
            }

            _context7.next = 3;
            return (0, _effects.take)(_Types2.default.GET_USER_STATUS_REQUEST);

          case 3:
            _ref2 = _context7.sent;
            _meta = _ref2.meta;
            _context7.next = 7;
            return (0, _effects.call)(attemptGetUserStatus, _meta);

          case 7:
            _context7.next = 0;
            break;

          case 9:
          case 'end':
            return _context7.stop();
        }
      }
    }, _marked[6], this);
  }

  function attemptGetUserMeta(meta) {
    var query, path, response, data, count, payload;
    return _regenerator2.default.wrap(function attemptGetUserMeta$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:

            // for new pagination
            query = meta.query ? meta.query : meta;
            path = meta.path ? meta.path : "/users/";

            // make the call to the api

            response = void 0;
            _context8.t0 = query.action;
            _context8.next = _context8.t0 === "meetyou" ? 6 : _context8.t0 === "meetmeyes" ? 10 : _context8.t0 === "meetmatches" ? 14 : 18;
            break;

          case 6:
            _context8.next = 8;
            return (0, _effects.call)(api.getMeetYou, { user_id: query.user_id, page: query.page, per_page: query.per_page });

          case 8:
            response = _context8.sent;
            return _context8.abrupt('break', 22);

          case 10:
            _context8.next = 12;
            return (0, _effects.call)(api.getMeetMeYes, { user_id: query.user_id, page: query.page, per_page: query.per_page });

          case 12:
            response = _context8.sent;
            return _context8.abrupt('break', 22);

          case 14:
            _context8.next = 16;
            return (0, _effects.call)(api.getMeetMatches, { user_id: query.user_id, page: query.page, per_page: query.per_page });

          case 16:
            response = _context8.sent;
            return _context8.abrupt('break', 22);

          case 18:
            _context8.next = 20;
            return (0, _effects.call)(api.getUserMeta, query);

          case 20:
            response = _context8.sent;
            return _context8.abrupt('break', 22);

          case 22:

            console.log('GOT USER META', response.data);

            // success?

            if (!(response && response.ok)) {
              _context8.next = 36;
              break;
            }

            //let count = response.data.meta.pagination.total;
            //let data = response.data.data;

            data = response.data.data;
            count = response.data.total;
            payload = (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(_UserMetaSchema2.default));

            if (!payload.result.length) {
              payload.entities.user_meta = {};
            }
            payload.query = query;
            payload.path = path;
            payload.count = count;

            console.log('NORMALIZED DATA', payload);

            _context8.next = 34;
            return (0, _effects.put)(_Creators2.default.getUserMetaSuccess(payload));

          case 34:
            _context8.next = 38;
            break;

          case 36:
            _context8.next = 38;
            return (0, _effects.put)(_Creators2.default.getUserMetaFailure(response.data));

          case 38:
          case 'end':
            return _context8.stop();
        }
      }
    }, _marked[7], this);
  }

  function watchGetUserMetaAttempt() {
    var _ref3, _meta2;

    return _regenerator2.default.wrap(function watchGetUserMetaAttempt$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!true) {
              _context9.next = 9;
              break;
            }

            _context9.next = 3;
            return (0, _effects.take)(_Types2.default.GET_USER_META_REQUEST);

          case 3:
            _ref3 = _context9.sent;
            _meta2 = _ref3.meta;
            _context9.next = 7;
            return (0, _effects.call)(attemptGetUserMeta, _meta2);

          case 7:
            _context9.next = 0;
            break;

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _marked[8], this);
  }

  function attemptAddUserMeta(meta) {
    var response;
    return _regenerator2.default.wrap(function attemptAddUserMeta$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _effects.call)(api.addUserMeta, meta);

          case 2:
            response = _context10.sent;


            console.log('ADD USER META RESPONSE', response, meta);

            // success?

            if (!(response && response.ok)) {
              _context10.next = 7;
              break;
            }

            _context10.next = 9;
            break;

          case 7:
            _context10.next = 9;
            return (0, _effects.put)(_Creators2.default.addUserMetaFailure(response.data));

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _marked[9], this);
  }

  function watchAddUserMetaAttempt() {
    var _ref4, _meta3;

    return _regenerator2.default.wrap(function watchAddUserMetaAttempt$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!true) {
              _context11.next = 9;
              break;
            }

            _context11.next = 3;
            return (0, _effects.take)(_Types2.default.ADD_USER_META_REQUEST);

          case 3:
            _ref4 = _context11.sent;
            _meta3 = _ref4.meta;
            _context11.next = 7;
            return (0, _effects.call)(attemptAddUserMeta, _meta3);

          case 7:
            _context11.next = 0;
            break;

          case 9:
          case 'end':
            return _context11.stop();
        }
      }
    }, _marked[10], this);
  }

  function attemptGetMeetMe(meta) {
    var response, user;
    return _regenerator2.default.wrap(function attemptGetMeetMe$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _effects.call)(api.getMeetMe, meta.query || {});

          case 2:
            response = _context12.sent;


            console.log('GOT MEETME', response.data);

            // success?

            if (!(response && response.ok)) {
              _context12.next = 11;
              break;
            }

            user = response.data;

            if (!user.id) {
              _context12.next = 9;
              break;
            }

            _context12.next = 9;
            return (0, _effects.put)(_Creators2.default.getMeetMeSuccess(user));

          case 9:
            _context12.next = 13;
            break;

          case 11:
            _context12.next = 13;
            return (0, _effects.put)(_Creators2.default.getMeetMeFailure(response.data));

          case 13:
          case 'end':
            return _context12.stop();
        }
      }
    }, _marked[11], this);
  }

  function watchGetMeetMeAttempt() {
    var _ref5, _meta4;

    return _regenerator2.default.wrap(function watchGetMeetMeAttempt$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!true) {
              _context13.next = 9;
              break;
            }

            _context13.next = 3;
            return (0, _effects.take)(_Types2.default.GET_MEETME_REQUEST);

          case 3:
            _ref5 = _context13.sent;
            _meta4 = _ref5.meta;
            _context13.next = 7;
            return (0, _effects.call)(attemptGetMeetMe, _meta4);

          case 7:
            _context13.next = 0;
            break;

          case 9:
          case 'end':
            return _context13.stop();
        }
      }
    }, _marked[12], this);
  }

  function attemptGetRatePhoto(meta) {
    var response, photo;
    return _regenerator2.default.wrap(function attemptGetRatePhoto$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _effects.call)(api.getRatePhoto, meta.query || {});

          case 2:
            response = _context14.sent;


            console.log('GOT RATEPHOTO', response.data);

            // success?

            if (!(response && response.ok)) {
              _context14.next = 11;
              break;
            }

            photo = response.data;

            if (!photo.url) {
              _context14.next = 9;
              break;
            }

            _context14.next = 9;
            return (0, _effects.put)(_Creators2.default.getRatePhotoSuccess(photo));

          case 9:
            _context14.next = 13;
            break;

          case 11:
            _context14.next = 13;
            return (0, _effects.put)(_Creators2.default.getRatePhotoFailure(response.data));

          case 13:
          case 'end':
            return _context14.stop();
        }
      }
    }, _marked[13], this);
  }

  function watchGetRatePhotoAttempt() {
    var _ref6, _meta5;

    return _regenerator2.default.wrap(function watchGetRatePhotoAttempt$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!true) {
              _context15.next = 9;
              break;
            }

            _context15.next = 3;
            return (0, _effects.take)(_Types2.default.GET_RATEPHOTO_REQUEST);

          case 3:
            _ref6 = _context15.sent;
            _meta5 = _ref6.meta;
            _context15.next = 7;
            return (0, _effects.call)(attemptGetRatePhoto, _meta5);

          case 7:
            _context15.next = 0;
            break;

          case 9:
          case 'end':
            return _context15.stop();
        }
      }
    }, _marked[14], this);
  }

  return {
    watchGetUsersPreloaderAttempt: watchGetUsersPreloaderAttempt,
    watchGetUsersAttempt: watchGetUsersAttempt,
    attemptGetUsers: attemptGetUsers,

    watchUpdateUsersAttempt: watchUpdateUsersAttempt,
    attemptUpdateUsers: attemptUpdateUsers,

    watchGetUserStatusAttempt: watchGetUserStatusAttempt,
    attemptGetUserStatus: attemptGetUserStatus,

    watchGetUserMetaAttempt: watchGetUserMetaAttempt,
    attemptGetUserMeta: attemptGetUserMeta,

    watchAddUserMetaAttempt: watchAddUserMetaAttempt,
    attemptAddUserMeta: attemptAddUserMeta,

    watchGetMeetMeAttempt: watchGetMeetMeAttempt,
    attemptGetMeetMe: attemptGetMeetMe,

    watchGetRatePhotoAttempt: watchGetRatePhotoAttempt,
    attemptGetRatePhoto: attemptGetRatePhoto
  };
};