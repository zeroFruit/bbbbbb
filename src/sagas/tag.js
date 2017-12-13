import { call, put, takeLatest } from 'redux-saga/effects';
import { types as tagTypes } from '../ducks/tag';
import { types as userTypes } from '../ducks/user';
import { types as bookTypes } from '../ducks/book';
import agent from '../Agent';

export function* AsyncFetchTagRequest(action) {
  yield put({
    type: tagTypes.FETCH_BOOK_TAG.READY
  });
  const { id } = action.payload;

  const book = yield call(agent.Book.fetchByBookId, id);
  const response = yield call(
    agent.Tag.fetchByAuthorTagIdAndBookTagId,
    book.author_tag_id,
    book.title_tag_id
  );

  yield put({
    type: tagTypes.FETCH_BOOK_TAG.SUCCESS,
    payload: response
  });
}

export default function* rootSaga() {
  yield takeLatest(tagTypes.FETCH_BOOK_TAG.REQUEST, AsyncFetchTagRequest);
}
