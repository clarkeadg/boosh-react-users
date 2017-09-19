'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apisauce = require('apisauce');

var _apisauce2 = _interopRequireDefault(_apisauce);

var _booshReactAuth = require('boosh-react-auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// a library to wrap and simplify api calls
var apiURL = 'http://local.api.boosh.io/';

// our "constructor"
var create = function create() {
  var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : apiURL;

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  var api = _apisauce2.default.create({
    // base URL is read from the "constructor"
    baseURL: baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // Force OpenWeather API Key on all requests
  /*api.addRequestTransform(request => {
    request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  })*/

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  //if (__DEV__ && console.tron) {
  //  console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //  iTunesApi.addMonitor(console.tron.apisauce)
  //}

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /* USERS */

  var getUsers = function getUsers(q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('users', q);
  };

  var updateUsers = function updateUsers(id, q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.put('users/' + id, q);
  };

  var getUserStatus = function getUserStatus(id) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('users/' + id + '/status');
  };

  var getUserMeta = function getUserMeta(q) {
    //let accessToken = window.localStorage.getItem('accessToken') || null;
    //if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta', q);
  };

  var addUserMeta = function addUserMeta(q) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.post('usermeta', q);
  };

  var deleteUserMeta = function deleteUserMeta(id) {
    var accessToken = (0, _booshReactAuth.getAccessToken)();
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.delete('usermeta/' + id);
  };

  var getMeetMe = function getMeetMe(q) {
    var accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('usermeta/meetme', q);
  };

  var getMeetYou = function getMeetYou(q) {
    var accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('usermeta/meetyou', q);
  };

  var getMeetMeYes = function getMeetMeYes(q) {
    var accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('usermeta/meetmeyes', q);
  };

  var getMeetMatches = function getMeetMatches(q) {
    var accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('usermeta/meetmatches', q);
  };

  var getRatePhoto = function getRatePhoto(q) {
    var accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer ' + accessToken);
    return api.get('usermeta/ratephoto', q);
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2

    getUsers: getUsers,
    updateUsers: updateUsers,

    getUserStatus: getUserStatus,

    getUserMeta: getUserMeta,
    addUserMeta: addUserMeta,
    deleteUserMeta: deleteUserMeta,

    getMeetMe: getMeetMe,
    getMeetYou: getMeetYou,
    getMeetMeYes: getMeetMeYes,
    getMeetMatches: getMeetMatches,
    getRatePhoto: getRatePhoto
  };
};

// let's return back our create method as the default.
exports.default = {
  create: create
};