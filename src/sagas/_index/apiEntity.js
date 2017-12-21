import { call, put, all } from 'redux-saga/effects';
import agent from '../../Agent';
import { requestEntity as bre } from '../book/requestEntity';
import { requestEntity as ure } from '../user/requestEntity';
import { types as bookTypes } from '../../ducks/book';
import { types as userTypes } from '../../ducks/user';
import {
  MapperBooksAndUsers,
  MapperBookAndUser,
  MapperBooks
} from '../helper';

export function* fetchBookAndUserApi(bid) {
  const result = yield call(agent.Book.__fetchByBookId, bid);
  const { book, user } = MapperBookAndUser(result);
  yield all([
    put({
      type: bookTypes._FETCH_BOOK,
      payload: book
    }),
    put({
      type: userTypes._FETCH_USER,
      payload: user
    })
  ]);
}

export function* fetchBooksAndUsersApi(nof, page) {
  const result = yield call(agent.Book.__fetch, nof, page);
  const { books, users } = MapperBooksAndUsers(result);
  yield all([
    put({
      type: bookTypes._FETCH_BOOKS,
      payload: books
    }),
    put({
      type: userTypes._FETCH_USERS,
      payload: users
    })
  ]);
}

export function* fetchBooksAndUsersByTagApi(bid, nof, page) {
  const result = yield call(agent.Book.__fetchByTag, bid, nof, page);
  const { books, users } = MapperBooksAndUsers(result);
  yield all([
    put({
      type: bookTypes._FETCH_BOOKS_BY_TAG,
      payload: books
    }),
    put({
      type: userTypes._FETCH_POST_LIST_USERS,
      payload: users
    })
  ]);
}

export function* fetchBooksAndUsersByAuthorTagApi(bid, nof, page) {
  const result = yield call(agent.Book.__fetchByAuthorTag, bid, nof, page);
  const { books, users } = MapperBooksAndUsers(result);
  yield all([
    put({
      type: bookTypes._FETCH_BOOKS_BY_ATHR_TAG,
      payload: books
    }),
    put({
      type: userTypes._FETCH_POST_LIST_USERS,
      payload: users
    })
  ]);
}

export function* fetchBooksByCollectionApi(cid) {
  const result = yield call(agent.Collection.__fetchById, cid);
  const books = MapperBooks(result);
  yield put({
    type: bookTypes._FETCH_BOOKS_FOR_COLLECTION,
    payload: books
  });
}

export function* fetchBooksByUserApi(uid) {
  const user = yield call(ure.selectedUser, uid);
  yield call(bre.selectedBooksForUser, user.books);
}
