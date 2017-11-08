import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/bookmarkReducer';
import agent from '../Agent';

export function* AsyncFetchBookmarkRequest(action) {
  const { book_ids } = yield call(agent.Bookmark.fetchByUserId, action.payload);

  yield put({
    type: types.FETCH_BOOKMARK_SUCCESS,
    payload: book_ids
  });
}

const root = function* rootSaga() {
  yield takeLatest(types.FETCH_BOOKMARK_REQEUST, AsyncFetchBookmarkRequest);
}

export default root;
