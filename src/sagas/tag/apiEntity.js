import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchBookTagApi(bid) {
  const book = yield call(agent.Book.fetchByBookId, bid);
  const result = yield call(
    agent.Tag.fetchByAuthorTagIdAndBookTagId,
    book.author_tag_id,
    book.title_tag_id
  );
  return result;
}
