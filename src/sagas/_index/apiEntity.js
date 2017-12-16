import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { requestEntity as bre } from '../book/requestEntity';
import { requestEntity as ure } from '../user/requestEntity';

export function* fetchBookAndUserApi(bid) {
  const book = yield call(bre.selectedBook, bid);
  yield call(ure.selectedUser, book.user_id);
}

export function* fetchBooksAndUsersApi(nof, page) {
  const books = yield call(bre.selectedBooks, nof, page);
  const users = books.map(b => b.user_id);
  yield call(ure.selectedUsers, users);
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
