import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/tag';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchTagByBidRequest(action) {
  const { id } = action.payload;
  yield call(re.selectedTagByBid, id);
}

export function* AsyncFetchTagByTidRequest(action) {
  const { athrid, titid } = action.payload;
  yield call(re.selectedTagByTid, athrid, titid);
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_TAG_BY_BID.REQUEST, AsyncFetchTagByBidRequest);
  yield takeLatest(types.FETCH_TAG_BY_TID.REQUEST, AsyncFetchTagByTidRequest);
}
