import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchBookApi(bid) {
  const result = yield call(agent.Book.fetchByBookId, bid);
  return result;
}

export function* fetchBooksApi(nof, page) {
  const result = yield call(agent.Book.fetch, nof, page);
  return result;
}

export function* fetchBooksByBookIdApi(bid, nof, page) {
  const b = yield call(agent.Book.fetchByBookId, bid);
  const result = yield call(agent.Book.fetchByTag, b.title_tag_id, b.author_tag_id, nof, page);
  return result;
}

export function* fetchBooksByAuthorTagIdApi(bid, nof, page) {
  const b = yield call(agent.Book.fetchByBookId, bid);
  const result = yield call(agent.Book.fetchByAuthorTag, b.author_tag_id, nof, page);
  return result;
}
