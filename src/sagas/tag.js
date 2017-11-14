import { call, put, takeLatest } from 'redux-saga/effects';
import { types as tagTypes } from '../ducks/tag';
import { types as userTypes } from '../ducks/user';
import { types as bookTypes } from '../ducks/book';
import agent from '../Agent';

export function* AsyncFetchTagRequest(action) {
  yield put({
    type: tagTypes.FETCH_BOOK_TAG_READY
  });
  const { user, id } = action.payload;

  const me = yield call(agent.User.fetchByUserId, user);
  const book = yield call(agent.Book.fetchByBookId, id);
  const response = yield call(
    agent.Tag.fetchByAuthorTagIdAndBookTagId,
    book.author_tag_id,
    book.title_tag_id
  );
  yield put({
    type: userTypes.FETCH_SELECTED_USER_SUCCESS,
    payload: me
  });
  yield put({
    type: bookTypes.FETCH_BOOK_SUCCESS,
    payload: book
  });

  yield put({
    type: tagTypes.FETCH_BOOK_TAG_FETCHING,
    payload: response
  });
  yield put({
    type: tagTypes.FETCH_BOOK_TAG_SUCCESS
  });
}

export default function* rootSaga() {
  yield takeLatest(tagTypes.FETCH_BOOK_TAG_REQUEST, AsyncFetchTagRequest);
}
