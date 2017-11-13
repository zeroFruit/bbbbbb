import { call, put, takeLatest } from 'redux-saga/effects';
import { types as userTypes } from '../ducks/user';
import { types as bookTypes } from '../ducks/book';
import agent from '../Agent';

export function* AsyncFetchMyInfoRequest(action) {
  yield put({
    type: userTypes.FETCH_ME_READY
  });

  const me = yield call(agent.User.fetchByUserId, action.payload);

  yield put({
    type: bookTypes.FETCH_MY_BOOKS_SUCCESS,
    payload: me.books
  });
  yield put({
    type: userTypes.FETCH_ME_SUCCESS,
    payload: me
  });
}

export function* AsyncFetchSelectedUserInfoRequest(action) {
  yield put({
    type: userTypes.FETCH_SELECTED_USER_READY
  });

  const me = yield call(agent.User.fetchByUserId, action.payload);
  yield put({
    type: userTypes.FETCH_SELECTED_USER_SUCCESS,
    payload: me
  });
}

export default function* rootSaga() {
  yield takeLatest(userTypes.FETCH_ME_REQUEST, AsyncFetchMyInfoRequest);
  yield takeLatest(userTypes.FETCH_SELECTED_USER_REQUEST, AsyncFetchSelectedUserInfoRequest);
}
