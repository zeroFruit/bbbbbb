import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperTags } from '../helper';

export function* fetchSearchResultsApi(txt) {
  // const result = yield call(agent.Search.fetchBookLabelByText, txt);
  const result = yield call(agent.Search.__search, txt);
  return MapperTags(result);
}
