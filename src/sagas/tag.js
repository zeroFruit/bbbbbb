import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/tag';
import agent from '../Agent';

export function* AsyncFetchTagRequest(action) {
  yield put({
    type: types.FETCH_BOOK_TAG_READY
  });
  const { authorTagId, bookTagId } = action.payload;
  const response = yield call(
    agent.Tag.fetchByAuthorTagIdAndBookTagId,
    authorTagId,
    bookTagId
  );
  yield put({
    type: types.FETCH_BOOK_TAG_FETCHING,
    payload: response
  });
  yield put({
    type: types.FETCH_BOOK_TAG_SUCCESS
  });
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK_TAG_REQUEST, AsyncFetchTagRequest);
}
