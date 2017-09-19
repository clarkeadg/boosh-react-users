import { take, put, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import { normalize, arrayOf } from 'normalizr'

import { PaginationActions } from 'boosh-react-pagination'

/* SCHEMAS */
import UserSchema from '../Schemas/UserSchema'
import UserMetaSchema from '../Schemas/UserMetaSchema'

export default (api) => {

  function * attemptGetUsers (meta) {

    //console.log('attemptGetUsers', meta)

    // for takeEvery
    meta = meta.meta;

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/users/";  
    
    // make the call to the api
    const response = yield call(api.getUsers, query)

    //console.log('GOT USERS',response.data)

    // success?
    if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(UserSchema));
      if (!payload.result.length) {
        payload.entities.users = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;

      //console.log('NORMALIZED DATA', payload)

      yield put(Actions.getUsersSuccess(payload))
    } else {
      yield put(Actions.getUsersFailure(response.data))
    }
  }

  function * watchGetUsersAttempt () {
    yield takeEvery(Types.GET_USERS_REQUEST, attemptGetUsers)
    // daemonize
    /*while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_USERS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetUsers, meta)
    }*/
  }

  function * watchGetUsersPreloaderAttempt () {
    //while (true) {
      const action = yield take(Types.GET_USERS_REQUEST)
      const { meta } = action
      yield call(attemptGetUsers, { meta: meta })
    //}
  }

  function * attemptUpdateUsers (meta) {

    let query = {};
    query.user_id = meta.id;
    if (meta.photo) query.photo = meta.photo;
    if (meta.email) query.email = meta.email;
    if (meta.username) query.username = meta.username;

    // make the call to the api
    const response = yield call(api.updateUsers, meta.id, query)

    console.log('UPDATE USERS',response.data)

    yield put(Actions.getUsersAttempt({
      id: meta.id
    }))

    // success?
    /*if (response && response.ok) {

      let count = response.data.meta.pagination.total;
      let data = response.data.data;

      let payload = normalize(data, arrayOf(UserSchema));
      if (!payload.result.length) {
        payload.entities.users = {};
      }
      //console.log('NORMALIZED DATA', payload)
      yield put(PaginationActions.gotPaginationCount({ count: count }))
      yield put(Actions.getUsersSuccess(payload))

    } else {
      yield put(Actions.getUsersFailure(response.data))
    }*/
  }

  function * watchUpdateUsersAttempt () {
    //yield takeEvery(Types.GET_USERS_REQUEST, attemptGetUsers)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.UPDATE_USERS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptUpdateUsers, meta)
    }
  }

  function * attemptGetUserStatus (meta) {

    // make the call to the api
    const response = yield call(api.getUserStatus, meta.id)

    console.log('GOT USER STATUS',response.data)

    // success?
    if (response && response.ok) {
      yield put(Actions.getUserStatusSuccess(response.data))
    } else {
      yield put(Actions.getUserStatusFailure(response.data))
    }
  }

  function * watchGetUserStatusAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_USER_STATUS_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetUserStatus, meta)
    }
  }

  function * attemptGetUserMeta (meta) {

    // for new pagination
    let query = meta.query ? meta.query : meta;
    let path = meta.path ? meta.path : "/users/";  

    // make the call to the api
    let response;

    switch(query.action) {
      case "meetyou":
        response = yield call(api.getMeetYou, { user_id: query.user_id, page: query.page, per_page: query.per_page })
      break;
      case "meetmeyes":
        response = yield call(api.getMeetMeYes, { user_id: query.user_id, page: query.page, per_page: query.per_page })
      break;
      case "meetmatches":
        response = yield call(api.getMeetMatches, { user_id: query.user_id, page: query.page, per_page: query.per_page })
      break;
      default:
        response = yield call(api.getUserMeta, query)
      break;
    }    

    console.log('GOT USER META',response.data)

    // success?
    if (response && response.ok) {

      //let count = response.data.meta.pagination.total;
      //let data = response.data.data;

      let data = response.data.data;
      let count = response.data.total;

      let payload = normalize(data, arrayOf(UserMetaSchema));
      if (!payload.result.length) {
        payload.entities.user_meta = {};
      }
      payload.query = query;
      payload.path = path;
      payload.count = count;

      console.log('NORMALIZED DATA', payload)

      yield put(Actions.getUserMetaSuccess(payload))
    } else {
      yield put(Actions.getUserMetaFailure(response.data))
    }
  }

  function * watchGetUserMetaAttempt () {
    //yield takeEvery(Types.GET_USERS_REQUEST, attemptGetUsers)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_USER_META_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetUserMeta, meta)
    }
  }

  function * attemptAddUserMeta(meta) {

    // make the call to the api
    const response = yield call(api.addUserMeta, meta)

    console.log('ADD USER META RESPONSE', response, meta)

    // success?
    if (response && response.ok) {
      //yield put(Actions.getUserMetaAttempt({item_type: meta.item_type, item_id: meta.item_id}));
    } else {
      yield put(Actions.addUserMetaFailure(response.data))
    }
  }

  function * watchAddUserMetaAttempt () {
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.ADD_USER_META_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptAddUserMeta, meta)
    }
  }

  function * attemptGetMeetMe (meta) { 

    // make the call to the api
    const response = yield call(api.getMeetMe, meta.query || {})

    console.log('GOT MEETME',response.data)

    // success?
    if (response && response.ok) {

      let user = response.data;
      if (user.id) {
        yield put(Actions.getMeetMeSuccess(user))
      }
    } else {
      yield put(Actions.getMeetMeFailure(response.data))
    }
  }

  function * watchGetMeetMeAttempt () {
    //yield takeEvery(Types.GET_MEETME_REQUEST, attemptGetMeetMe)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_MEETME_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetMeetMe, meta)
    }
  }

  function * attemptGetRatePhoto (meta) { 

    // make the call to the api
    const response = yield call(api.getRatePhoto, meta.query || {})

    console.log('GOT RATEPHOTO',response.data)

    // success?
    if (response && response.ok) {

      let photo = response.data;
      if (photo.url) {
        yield put(Actions.getRatePhotoSuccess(photo))
      }
    } else {
      yield put(Actions.getRatePhotoFailure(response.data))
    }
  }

  function * watchGetRatePhotoAttempt () {
    //yield takeEvery(Types.GET_RATEPHOTO_REQUEST, attemptGetRatePhoto)
    // daemonize
    while (true) {
      // wait for LOGIN_REQUEST actions to arrive
      const { meta } = yield take(Types.GET_RATEPHOTO_REQUEST)
      // call attemptLogin to perform the actual work
      yield call(attemptGetRatePhoto, meta)
    }
  }

  return {
    watchGetUsersPreloaderAttempt,
    watchGetUsersAttempt,
    attemptGetUsers,

    watchUpdateUsersAttempt,
    attemptUpdateUsers,

    watchGetUserStatusAttempt,
    attemptGetUserStatus,

    watchGetUserMetaAttempt,
    attemptGetUserMeta,

    watchAddUserMetaAttempt,
    attemptAddUserMeta,
    
    watchGetMeetMeAttempt,
    attemptGetMeetMe,
    
    watchGetRatePhotoAttempt,
    attemptGetRatePhoto    
  }
}
