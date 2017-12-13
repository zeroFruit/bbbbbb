import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/search';
import agent from '../Agent';

export function* AsyncFetchSearchResultRequest(action) {
  yield put({
    type: types.FETCH_SEARCH_RESULT.READY
  });
  const results = yield call(agent.Search.fetchBookLabelByText, action.payload);
  yield put({
    type: types.FETCH_SEARCH_RESULT.SUCCESS,
    payload: results
  });
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_SEARCH_RESULT.REQUEST, AsyncFetchSearchResultRequest);
}
