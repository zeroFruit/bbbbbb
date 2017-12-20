import { call, put, all } from 'redux-saga/effects';
import agent from '../../Agent';
import { requestEntity as bre } from '../book/requestEntity';
import { requestEntity as ure } from '../user/requestEntity';
import { types as bookTypes } from '../../ducks/book';
import { types as userTypes } from '../../ducks/user';
import { MapperBooksAndUsers } from '../helper';

export function* fetchBookAndUserApi(bid) {
  const book = yield call(bre.selectedBook, bid);
  yield call(ure.selectedUser, book.user_id);
}

export function* fetchBooksAndUsersApi(nof, page) {
  const result = yield call(agent.Book.__fetch, nof, page);
  const { books, users } = MapperBooksAndUsers(result);
  yield all([
    put({
      type: bookTypes._FETCH_SELECTED_BOOKS,
      payload: books
    }),
    put({
      type: userTypes._FETCH_SELECTED_USERS,
      payload: users
    })
  ]);
}

export function* fetchBooksAndUsersByTagApi(bid, nof, page) {
  const books = yield call(bre.selectedBooksByTag, bid, nof, page);
  const users = books.map(b => b.user_id);
  yield call(ure.selectedPostListUsers, users);
}

export function* fetchBooksAndUsersByAuthorTagApi(bid, nof, page) {
  const books = yield call(bre.selectedBooksByAuthorTag, bid, nof, page);
  const users = books.map(b => b.user_id);
  yield call(ure.selectedPostListUsers, users);
}

export function* fetchBooksByCollectionApi(cid) {
  const cln = yield call(agent.Collection.fetchById, cid);
  yield call(bre.selectedBooksForCollection, cln.book_ids);
}

export function* fetchBooksByUserApi(uid) {
  const user = yield call(ure.selectedUser, uid);
  yield call(bre.selectedBooksForUser, user.books);
}
