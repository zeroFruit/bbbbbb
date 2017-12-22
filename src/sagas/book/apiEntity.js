import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { USER_ID } from '../../config';
import { MapperBooks } from '../helper';

export function* fetchBookApi(bid) {
  const result = yield call(agent.Book.fetchByBookId, bid);
  return MapperBooks(result);
}

export function* fetchBooksApi(nof, page) {
  const result = yield call(agent.Book.__fetchAll, nof, page);
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

export function* fetchBooksByBookIdsApi(bidList) {
  const result = yield call(agent.Book.fetchByBookIds, bidList);
  return result;
}

export function* fetchBooksByUserIdApi(uid) {
  const result = yield call(agent.Book.fetchByBookIds, uid);
  return result;
}

export function* addBookApi({ img_src, content, user_id, bookTitle, bookAuthor }) {
  const result = yield call(agent.Book.insert, { img_src, content, user_id });
  const t = yield call(agent.Search.fetchBookTagIdAndAuthorTagIdByText, result.id, bookTitle, bookAuthor);
  yield call(agent.Book.updateTagIds, result.id, t.title_tag_id, t.author_tag_id);
  yield call(agent.User.insertBook, USER_ID, result.id);
  return result;
}
