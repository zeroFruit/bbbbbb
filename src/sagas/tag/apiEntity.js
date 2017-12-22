import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperTag } from '../helper';

export function* fetchBookTagApi(bid) {
  const result = yield call(agent.Book.__fetchTag, bid);
  return MapperTag(result);
}
