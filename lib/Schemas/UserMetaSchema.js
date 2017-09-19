'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

var UserMetaSchema = new _normalizr.Schema('user_meta', { idAttribute: 'user_id' });

exports.default = UserMetaSchema;