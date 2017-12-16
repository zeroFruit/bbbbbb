import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/bookmark';
import agent from '../Agent';
import { USER_ID } from '../config';

export function* AsyncFetchBookmarkRequest(action) {
  yield put({
    type: types.FETCH_BOOKMARK.READY
  });

  const { book_ids } = yield call(agent.Bookmark.fetchByUserId, action.payload);

  yield put({
    type: types.FETCH_BOOKMARK.SUCCESS,
    payload: book_ids
  });
}

export function* AsyncAddBookmarkRequest(action) {
  yield put({
    type: types.ADD_BOOKMARK.READY
  });

  yield call(agent.Bookmark.addByBookId, action.payload, USER_ID);

  yield put({
    type: types.ADD_BOOKMARK.SUCCESS,
    payload: action.payload
  });
}

export function* AsyncRemoveBookmarkRequest(action) {
  yield put({
    type: types.REMOVE_BOOKMARK.READY
  });

  yield call(agent.Bookmark.removeByBookId, action.payload, USER_ID);

  yield put({
    type: types.REMOVE_BOOKMARK.SUCCESS,
    payload: action.payload
  });
}

export default function* rootSaga() {
  yield takeLatest(types.ADD_BOOKMARK.REQUEST, AsyncAddBookmarkRequest);
  yield takeLatest(types.REMOVE_BOOKMARK.REQUEST, AsyncRemoveBookmarkRequest);
  yield takeLatest(types.FETCH_BOOKMARK.REQUEST, AsyncFetchBookmarkRequest);
}
