import { put } from 'redux-saga/effects';
import { types as bookTypes } from '../../ducks/book';
import { types as userTypes } from '../../ducks/user';
import { types as pageTypes } from '../../ducks/page';

export function* FetchBooksForCollection({ book_ids }) {
  yield put({
    type: bookTypes._FETCH_BOOKS_FOR_COLLECTION,
    payload: book_ids
  });
}

export function* FetchMyBooks({ books }) {
  yield put({
    type: bookTypes._FETCH_MY_BOOKS,
    payload: books
  });
}

export function* NextNewsfeedPage() {
  yield put({
    type: pageTypes.NEXT_NEWSFEED_PAGE
  });
}

export function* NextSelectedPage() {
  yield put({
    type: pageTypes.NEXT_SELECTED_LIST_PAGE
  });
}

export function* FetchSelectedBooks(books) {
  yield put({
    type: bookTypes._FETCH_SELECTED_BOOKS,
    payload: books
  });
}

export function* FetchSelectedUsers(users) {
  yield put({
    type: userTypes._FETCH_SELECTED_USERS,
    payload: users
  });
}
