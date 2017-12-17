import { call, put } from 'redux-saga/effects';
import { hasPath } from '../utils/ObjectUtils';

export function* fetchEntity(entity, ...args) {
  yield put(entity.ready());
  const result = yield call(entity.api, ...args);
  if (hasPath(entity, 'fetch')) {
    yield call(entity.fetch, result);
  }
  yield put(entity.success(result));
  return result;
}
