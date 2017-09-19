'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeMeta = exports.getVisibleUserMeta = exports.getUserMetaCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allUserMeta = function allUserMeta(state, props) {
  return state.user_meta;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'users';
};

var meId = function meId(state, props) {
  return props.me ? props.me.id || 0 : 0;
};

/* Exports */

var getUserMetaCollection = exports.getUserMetaCollection = (0, _reselect.createSelector)([allUserMeta, path], function (usermeta, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!usermeta.collections[key]) return collection;
  collection.count = usermeta.collections[key].count;
  collection.items = usermeta.collections[key].result.map(function (id) {
    return usermeta.entities[id];
  });
  return collection;
});

var getVisibleUserMeta = exports.getVisibleUserMeta = (0, _reselect.createSelector)([allUserMeta], function (usermeta) {
  return usermeta.result.map(function (id) {
    return usermeta.entities[id];
  });
});

var getMeMeta = exports.getMeMeta = (0, _reselect.createSelector)([allUserMeta, meId], function (user_meta, id) {
  return user_meta.entities[id];
});