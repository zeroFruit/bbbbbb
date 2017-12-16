import { put } from 'redux-saga/effects';
import { types as bookTypes } from '../../ducks/book';

export function* FetchBooksForCollection({ book_ids }) {
  yield put({
    type: bookTypes._FETCH_BOOKS_FOR_COLLECTION,
    payload: book_ids
  });
}

export function* FetchMyBooks(books) {
  yield put({
    type: bookTypes._FETCH_MY_BOOKS,
    payload: books
  });
}
