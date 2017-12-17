import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/user';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchMyInfoRequest(action) {
  const result = yield call(re.me, action.payload);
  return result;
}

export function* AsyncFetchSelectedUserInfoRequest(action) {
  const result = yield call(re.selectedUser, action.payload);
  return result;
}

export function* AsyncFetchUsersByUserIds(action) {
  const { users } = action.payload;
  const result = yield call(re.selectedUsers, users);
  return result;
}

export function* AsyncFetchUsersByUserIdsForPostList(action) {
  const { users } = action.payload;
  const result = yield call(re.selectedPostListUsers, users);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_ME.REQUEST, AsyncFetchMyInfoRequest);
  yield takeLatest(types.FETCH_SELECTED_USER.REQUEST, AsyncFetchSelectedUserInfoRequest);
  yield takeLatest(types.FETCH_SELECTED_USERS.REQUEST, AsyncFetchUsersByUserIds);
  yield takeLatest(types.FETCH_SELECTED_POST_LIST_USERS.REQUEST, AsyncFetchUsersByUserIdsForPostList);
}
