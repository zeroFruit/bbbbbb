import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/book';
import agent from '../../Agent';
import { USER_ID } from '../../config';
import { pickByKey } from '../../utils/ObjectUtils';
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
  yield put({
    type: types.FETCH_BOOKS_FOR_COLLECTION.READY
  });
  const books = yield call(agent.Book.fetchByBookIds, action.payload);
  yield put({
    type: types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS,
    payload: books
  });

  return books;
}

export function* AsyncFetchBooksByUserId(action) {
  yield put({
    type: types.FETCH_BOOKS_FOR_USER.READY
  });
  const books = yield call(agent.Book.fetchByBookIds, action.payload);
  yield put({
    type: types.FETCH_BOOKS_FOR_USER.SUCCESS,
    payload: books
  });

  return books;
}

export function* AsyncAddBook(action) {
  yield put({
    type: types.ADD_BOOK.READY
  });

  const book = yield call(agent.Book.insert, pickByKey(action.payload, ['img_src', 'content', 'user_id']));
  const { bookTitle, bookAuthor } = action.payload;
  const tag = yield call(agent.Search.fetchBookTagIdAndAuthorTagIdByText, book.id, bookTitle, bookAuthor);
  const bookWithTagId = yield call(
    agent.Book.updateTagIds,
    book.id,
    tag.title_tag_id,
    tag.author_tag_id
  );
  const me = yield call(agent.User.insertBook, USER_ID, book.id);

  yield put({
    type: types.ADD_BOOK.SUCCESS
  });

  return book;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK.REQUEST, AsyncFetchBook);
  yield takeLatest(types.FETCH_BOOKS.REQUEST, AsyncFetchBooks);
  yield takeLatest(types.FETCH_BOOKS_BY_TAG.REQUEST, AsyncFetchBooksByIdForSameTag);
  yield takeLatest(types.FETCH_BOOKS_FOR_COLLECTION.REQUEST, AsyncFetchBooksByIds);
  yield takeLatest(types.FETCH_BOOKS_FOR_USER.REQUEST, AsyncFetchBooksByUserId);
  yield takeLatest(types.ADD_BOOK.REQUEST, AsyncAddBook);
}
