import { call, put, takeLatest } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchBookApi(bid) {
  const result = yield call(agent.Book.fetchByBookId, bid);
  return result;
}
