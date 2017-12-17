import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/bookmark';
import agent from '../../Agent';
import { USER_ID } from '../../config';
import { requestEntity as re } from './requestEntity';

export function* AsyncAddBookmarkRequest(action) {
  const result = yield call(re.addBookmark, action.payload, USER_ID);
  return result;
}

export function* AsyncRemoveBookmarkRequest(action) {
  const result = yield call(re.removeBookmark, action.payload, USER_ID);
  return result;
}

export function* AsyncFetchBookmarkRequest(action) {
  const result = yield call(re.fetchBookmark, action.payload);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.ADD_BOOKMARK.REQUEST, AsyncAddBookmarkRequest);
  yield takeLatest(types.REMOVE_BOOKMARK.REQUEST, AsyncRemoveBookmarkRequest);
  yield takeLatest(types.FETCH_BOOKMARK.REQUEST, AsyncFetchBookmarkRequest);
}
