import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/book';
import agent from '../Agent';
import { USER_ID } from '../config';
import { pickByKey } from '../utils/ObjectUtils';

export function* AsyncFetchBook(action) {
  yield put({
    type: types.FETCH_BOOK.READY
  });
  const book = yield call(agent.Book.fetchByBookId, action.payload);
  yield put({
    type: types.FETCH_BOOK.SUCCESS,
    payload: book
  });
  return book;
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

export function* AsyncFetchBooksByIdForSameTag(action) {
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

export function* AsyncFetchBooksByAuthorTagId(action) {
  const { id, numOfFeeds, page } = action.payload;
  yield put({
    type: types.FETCH_BOOKS_BY_AUTHOR_TAG_READY
  });
  const { author_tag_id } = yield call(agent.Book.fetchByBookId, id);
  const filteredBooks = yield call(agent.Book.fetchByAuthorTag, author_tag_id, numOfFeeds, page);

  yield put({
    type: types.FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS,
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

export function* AsyncFetchBooksByUserId(action) {
  yield put({
    type: types.FETCH_BOOKS_FOR_USER_READY
  });
  const books = yield call(agent.Book.fetchByBookIds, action.payload);
  yield put({
    type: types.FETCH_BOOKS_FOR_USER_SUCCESS,
    payload: books
  });

  return books;
}

export function* AsyncAddBook(action) {
  yield put({
    type: types.ADD_BOOK_READY
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
    type: types.ADD_BOOK_SUCCESS
  });

  return book;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK.REQUEST, AsyncFetchBook);
  yield takeLatest(types.FETCH_BOOKS_REQUEST, AsyncFetchBooks);
  yield takeLatest(types.FETCH_BOOKS_BY_TAG_REQUEST, AsyncFetchBooksByIdForSameTag);
  yield takeLatest(types.FETCH_BOOKS_FOR_COLLECTION_REQUEST, AsyncFetchBooksByIds);
  yield takeLatest(types.FETCH_BOOKS_FOR_USER_REQUEST, AsyncFetchBooksByUserId);
  yield takeLatest(types.ADD_BOOK_REQUEST, AsyncAddBook);
}
