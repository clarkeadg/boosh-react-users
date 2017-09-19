// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import { getAccessToken } from 'boosh-react-auth'

const apiURL = 'http://local.api.boosh.io/'

// our "constructor"
const create = (baseURL = apiURL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

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

  const getUsers = (q) => {
    let accessToken = getAccessToken();
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('users',q)
  }

  const updateUsers = (id, q) => {
    let accessToken = getAccessToken();
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.put('users/'+id,q)
  }

  const getUserStatus = (id) => {
    let accessToken = getAccessToken();
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('users/'+id+'/status')
  }

  const getUserMeta = (q) => {
    //let accessToken = window.localStorage.getItem('accessToken') || null;
    //if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta',q)
  }

  const addUserMeta = (q) => {
    let accessToken = getAccessToken();
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.post('usermeta',q)
  }

  const deleteUserMeta = (id) => {
    let accessToken = getAccessToken();
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.delete('usermeta/'+id)
  }

  const getMeetMe = (q) => {
    let accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta/meetme',q)
  }

  const getMeetYou = (q) => {
    let accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta/meetyou',q)
  }

  const getMeetMeYes = (q) => {
    let accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta/meetmeyes',q)
  }

  const getMeetMatches = (q) => {
    let accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta/meetmatches',q)
  }

  const getRatePhoto = (q) => {
    let accessToken = window.localStorage.getItem('accessToken') || null;
    if (accessToken) api.setHeader('Authorization', 'Bearer '+accessToken)
    return api.get('usermeta/ratephoto',q)
  }

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

    getUsers,
    updateUsers,

    getUserStatus,

    getUserMeta,
    addUserMeta,
    deleteUserMeta,

    getMeetMe,
    getMeetYou,
    getMeetMeYes,
    getMeetMatches,
    getRatePhoto
  }
}

// let's return back our create method as the default.
export default {
  create
}
