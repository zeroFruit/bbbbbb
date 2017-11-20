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

export function* AsyncFetchBooks(action) {
  const { numOfFeeds, page } = action.payload;
  yield put({
    type: types.FETCH_BOOKS_READY
  });

  const books = yield call(agent.Book.fetch, numOfFeeds, page);

  yield put({
    type: types.FETCH_BOOKS_SUCCESS,
    payload: books
  });

  return books;
}

export function* AsyncFetchBooksByTagId(action) {
  const { id, numOfFeeds, page } = action.payload;
  yield put({
    type: types.FETCH_BOOKS_BY_TAG_READY
  });
  const { title_tag_id, author_tag_id } = yield call(agent.Book.fetchByBookId, id);
  const filteredBooks = yield call(agent.Book.fetchByTag, title_tag_id, author_tag_id, numOfFeeds, page);

  yield put({
    type: types.FETCH_BOOKS_BY_TAG_SUCCESS,
    payload: filteredBooks
  });

  return filteredBooks;
}

export function* AsyncFetchBooksByIds(action) {
  yield put({
    type: types.FETCH_BOOKS_FOR_COLLECTION_READY
  });
  const books = yield call(agent.Book.fetchByBookIds, action.payload);

  yield put({
    type: types.FETCH_BOOKS_FOR_COLLECTION_SUCCESS,
    payload: books
  });

  return books;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK_REQUEST, AsyncFetchBookRequest);
  yield takeLatest(types.FETCH_BOOKS_REQUEST, AsyncFetchBooks);
  yield takeLatest(types.FETCH_BOOKS_BY_TAG_REQUEST, AsyncFetchBooksByTagId);
  yield takeLatest(types.FETCH_BOOKS_FOR_COLLECTION_REQUEST, AsyncFetchBooksByIds);
}
