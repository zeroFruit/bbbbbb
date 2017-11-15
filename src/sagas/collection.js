import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/collection';
import agent from '../Agent';
import { USER_ID } from '../config';

export function* AsyncFetchCollectionRequest(action) {
  yield put({
    type: types.FETCH_COLLECTION_READY
  });
  const me = yield call(agent.User.fetchByUserId, USER_ID);
  const collections = yield call(agent.Collection.fetchByIds, me.collections);

  yield put({
    type: types.FETCH_COLLECTION_SUCCESS,
    payload: collections
  });
}

export function* AsyncAddCollectionRequest(action) {
  yield put({
    type: types.ADD_COLLECTION_READY
  });
  const { label, bookIds } = action.payload;
  const collection = yield call(agent.Collection.insertCollection, label, bookIds);
  console.log('saga1', collection);
  const me = yield call(agent.User.insertCollection, USER_ID, collection.id);
  console.log('saga2', me);
  yield put({
    type: types.ADD_COLLECTION_SUCCESS
  });
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_COLLECTION_REQUEST, AsyncFetchCollectionRequest);
  yield takeLatest(types.ADD_COLLECTION_REQUEST, AsyncAddCollectionRequest);
}
