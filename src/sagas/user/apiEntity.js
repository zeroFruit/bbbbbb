import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperUser } from '../helper';

export function* fetchUserApi(uid) {
  const rt = yield call(agent.User.__fetchByUserId, uid);
  return MapperUser(rt);
}

export function* fetchUsersApi(uids) {
  const rt = yield call(agent.User.fetchByUserIds, uids);
  return rt;
}
