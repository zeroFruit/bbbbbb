import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchUserApi(uid) {
  const rt = yield call(agent.User.fetchByUserId, uid);
  return rt;
}

export function* fetchUsersApi(uids) {
  const rt = yield call(agent.User.fetchByUserIds, uids);
  return rt;
}
