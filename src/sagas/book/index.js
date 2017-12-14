import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/book';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchBook(action) {
  const result = yield call(re.selectedBook, action.payload);
  return result;
}

export function* AsyncFetchBooks(action) {
  const { numOfFeeds, page } = action.payload;
  const result = yield call(re.selectedBooks, numOfFeeds, page);
  return result;
}

export function* AsyncFetchBooksByIdForSameTag(action) {
  const { id, numOfFeeds, page } = action.payload;
  const result = yield call(re.selectedBooksByTag, id, numOfFeeds, page)
  return result;
}

export function* AsyncFetchBooksByAuthorTagId(action) {
  const { id, numOfFeeds, page } = action.payload;
  const result = yield call(re.selectedBooksByAuthorTag, id, numOfFeeds, page);
  return result;
}

export function* AsyncFetchBooksByIds(action) {
  const result = yield call(re.selectedBooksForCollection, action.payload);
  return result;
}

export function* AsyncFetchBooksByUserId(action) {
  const result = yield call(re.selectedBooksForUser, action.payload);
  return result;
}

export function* AsyncAddBook(action) {
  const result = yield call(re.addBook, action.payload);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK.REQUEST, AsyncFetchBook);
  yield takeLatest(types.FETCH_BOOKS.REQUEST, AsyncFetchBooks);
  yield takeLatest(types.FETCH_BOOKS_BY_TAG.REQUEST, AsyncFetchBooksByIdForSameTag);
  yield takeLatest(types.FETCH_BOOKS_FOR_COLLECTION.REQUEST, AsyncFetchBooksByIds);
  yield takeLatest(types.FETCH_BOOKS_FOR_USER.REQUEST, AsyncFetchBooksByUserId);
  yield takeLatest(types.ADD_BOOK.REQUEST, AsyncAddBook);
}
