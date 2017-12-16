import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/search';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchSearchResultRequest(action) {
  const result = yield call(re.searchResult, action.payload);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_SEARCH_RESULT.REQUEST, AsyncFetchSearchResultRequest);
}
