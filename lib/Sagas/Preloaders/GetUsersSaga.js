'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = getUsersSaga;

var _effects = require('redux-saga/effects');

var _Creators = require('../../Actions/Creators');

var _Creators2 = _interopRequireDefault(_Creators);

var _UsersApi = require('../../Services/UsersApi');

var _UsersApi2 = _interopRequireDefault(_UsersApi);

var _UsersSaga = require('./../UsersSaga');

var _UsersSaga2 = _interopRequireDefault(_UsersSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getUsersSaga].map(_regenerator2.default.mark);

// create api
var api = _UsersApi2.default.create();

// start the daemons
function getUsersSaga(meta) {
  return _regenerator2.default.wrap(function getUsersSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return [(0, _effects.fork)((0, _UsersSaga2.default)(api).watchGetUsersPreloaderAttempt)];

        case 2:
          _context.next = 4;
          return (0, _effects.put)(_Creators2.default.getUsersAttempt(meta));

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}