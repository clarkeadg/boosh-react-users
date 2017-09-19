'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByUsername = exports.getUserById = exports.getVisibleUsers = exports.getUsersCollection = undefined;

var _reselect = require('reselect');

/* Private */

var allUsers = function allUsers(state, props) {
  return state.users;
};

var userId = function userId(state, props) {
  return props.user_id;
};

var path = function path(state, props) {
  return props.path ? props.path.replace(/\//g, '') : 'users';
};

var username = function username(state, props) {
  return props.routeParams.username || "";
};

/* Exports */

var getUsersCollection = exports.getUsersCollection = (0, _reselect.createSelector)([allUsers, path], function (users, key) {
  var collection = {
    items: [],
    count: 0
  };
  if (!users.collections[key]) return collection;
  collection.count = users.collections[key].count;
  collection.items = users.collections[key].result.map(function (id) {
    return users.entities[id];
  });
  return collection;
});

var getVisibleUsers = exports.getVisibleUsers = (0, _reselect.createSelector)([allUsers], function (users) {
  return users.result.map(function (id) {
    return users.entities[id];
  });
});

var getUserById = exports.getUserById = (0, _reselect.createSelector)([allUsers, userId], function (users, id) {
  return users.entities[id];
});

var getUserByUsername = exports.getUserByUsername = (0, _reselect.createSelector)([allUsers, username], function (users, name) {
  for (var id in users.entities) {
    if (users.entities[id].username == name) {
      return users.entities[id];
    }
  }
  return null;
});