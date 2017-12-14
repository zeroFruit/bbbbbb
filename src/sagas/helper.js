import { call, put } from 'redux-saga/effects';

export function* fetchEntity(entity, ...args) {
  yield put(entity.ready());
  const result = yield call(entity.api, ...args);
  yield put(entity.success(result));
  return result;
}
