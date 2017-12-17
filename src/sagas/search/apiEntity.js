import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchSearchResultsApi(txt) {
  const results = yield call(agent.Search.fetchBookLabelByText, txt);
  return result;
}
