'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var UserSchema = new _normalizr.Schema('users', { idAttribute: 'id' });

exports.default = UserSchema;