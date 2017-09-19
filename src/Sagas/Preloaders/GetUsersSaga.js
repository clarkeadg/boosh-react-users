import { fork, put } from 'redux-saga/effects'

import Actions from '../../Actions/Creators'
import UsersApi from '../../Services/UsersApi'
import GetUsersSaga from './../UsersSaga'

// create api
const api = UsersApi.create()

// start the daemons
export default function * getUsersSaga(meta) {
  yield [
    fork(GetUsersSaga(api).watchGetUsersPreloaderAttempt)
  ]
  yield put(Actions.getUsersAttempt(meta))
}
