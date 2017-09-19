'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ACTION_HANDLERS;

var _Types = require('../Actions/Types');

var _Types2 = _interopRequireDefault(_Types);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxsauce = require('reduxsauce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertKeys = function insertKeys() {};

var collections = {};

var inches2height = function inches2height(inches) {
  if (!inches) return '';
  var feet = Math.floor(inches / 12);
  inches %= 12;
  return feet + "' " + inches + '"';
};

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)({
  entities: {},
  //result: [],
  collections: collections,
  errorCode: null,
  attempting: false
});

// request
var attempt = function attempt(state, action) {
  //console.log('USER REDUCER ATTEMPT', state, action)

  var path = '';
  if (action.meta.path) {
    path = action.meta.path.replace(/\//g, '');
    if (!collections[path]) collections[path] = {};
    collections[path].result = [];
    collections[path].attempting = true;
    collections[path].count = 0;
  }

  return state.merge({
    attempting: true,
    collections: collections
  });
};

// recieve
var success = function success(state, action) {
  var _loop = function _loop(id) {
    var user = action.payload.entities.users[id];
    user.meta = {};
    user.usermeta.data.map(function (v, i) {
      var keys = v.item_key.split('.');
      var key1 = keys[0];
      var key2 = keys[1];
      if (!user.meta[key1]) {
        user.meta[key1] = {};
      }
      user.meta[key1][key2] = v.item_value;

      if (key1 == "about" && key2 == "height") {
        user.meta[key1][key2] = inches2height(v.item_value);
      }
    });
  };

  //console.log('USER REDUCER SUCCESS',action.payload.entities.users)

  for (var id in action.payload.entities.users) {
    _loop(id);
  }

  var path = '';
  if (action.payload.path) {
    path = action.payload.path.replace(/\//g, '');
    if (!collections[path]) collections[path] = {};
    collections[path].result = action.payload.result;
    collections[path].count = action.payload.count || 0;
    collections[path].attempting = false;
  }

  //console.log('USER REDUCER WITH META',action.payload.entities.users) 

  return state.merge({
    attempting: false,
    errorCode: null,
    entities: state.entities.merge(action.payload.entities.users),
    //result: action.payload.result,
    collections: collections
    //result: state.result.concat(action.payload.result)
  });
};

// failure
var failure = function failure(state, action) {
  return state.merge({ attempting: false, errorCode: action.errorCode });
};

// map our types to our handlers
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_USERS_REQUEST, attempt), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_USERS_SUCCESS, success), (0, _defineProperty3.default)(_ACTION_HANDLERS, _Types2.default.GET_USERS_FAILURE, failure), _ACTION_HANDLERS);

exports.default = (0, _reduxsauce.createReducer)(INITIAL_STATE, ACTION_HANDLERS);