import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/tag';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchTagRequest(action) {
  const { id } = action.payload;
  const result = yield call(re.selectedTag, id);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK_TAG.REQUEST, AsyncFetchTagRequest);
}
