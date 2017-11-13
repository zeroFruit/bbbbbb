import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/book';
import agent from '../Agent';

export function* AsyncFetchBookRequest(action) {
  yield put({
    type: types.FETCH_BOOK_READY
  });
  const book = yield call(agent.Book.fetchByBookId, action.payload);

  yield put({
    type: types.FETCH_BOOK_SUCCESS,
    payload: book
  });
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK_REQUEST, AsyncFetchBookRequest);
}
