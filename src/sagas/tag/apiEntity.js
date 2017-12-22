import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperTag } from '../helper';

export function* fetchBookTagByBidApi(bid) {
  const result = yield call(agent.Book.__fetchTag, bid);
  return MapperTag(result);
}

export function* fetchBookTagByTidApi(athrid, titid) {
  return {
    bookTitle: 'bookTitle',
    bookAuthor: 'authorTitle'
  };
}
