import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../ducks/collection';
import { types as bookTypes } from '../ducks/book';
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
  const me = yield call(agent.User.insertCollection, USER_ID, collection.id);
  yield put({
    type: types.ADD_COLLECTION_SUCCESS
  });
}

export function* AsyncDeleteCollectionRequest(action) {
  yield put({
    type: types.REMOVE_COLLECTION_READY
  });
  const collection = yield call(agent.Collection.deleteCollection, action.payload);
  const me = yield call(agent.User.deleteCollection, USER_ID, collection.id);
  yield put({
    type: types.REMOVE_COLLECTION_SUCCESS
  });
}

export function* AsyncAddBooksToCollectionRequest(action) {
  yield put({
    type: types.ADD_BOOKS_TO_COLLECTION_READY
  });
  const { id, bookIds } = action.payload;
  const updatedCollection = yield call(agent.Collection.updateBooksToCollection, id, bookIds);

  yield put({
    type: bookTypes.FETCH_BOOKS_FOR_COLLECTION_FETCHING,
    payload: updatedCollection.book_ids
  });
  yield put({
    type: types.ADD_BOOKS_TO_COLLECTION_SUCCESS
  });
}

export function* AsyncDeleteCollectionBookRequest(action) {
  yield put({
    type: types.REMOVE_COLLECTION_BOOKS_READY
  });
  const { id, bookIds } = action.payload;
  const collection = yield call(agent.Collection.deleteCollectionBooks, id, bookIds);
  yield put({
    type: types.REMOVE_COLLECTION_BOOKS_SUCCESS
  });
}

export function* AsyncFetchOtherUserCollectionRequest(action) {
  yield put({
    type: types.FETCH_OTHER_USER_COLLECTION_READY
  });
  const user = yield call(agent.User.fetchByUserId, action.payload);
  const collections = yield call(agent.Collection.fetchByIds, user.collections);
  yield put({
    type: types.FETCH_OTHER_USER_COLLECTION_SUCCESS,
    payload: collections
  });
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_COLLECTION_REQUEST, AsyncFetchCollectionRequest);
  yield takeLatest(types.ADD_COLLECTION_REQUEST, AsyncAddCollectionRequest);
  yield takeLatest(types.REMOVE_COLLECTION_REQUEST, AsyncDeleteCollectionRequest);
  yield takeLatest(types.ADD_BOOKS_TO_COLLECTION_REQUEST, AsyncAddBooksToCollectionRequest);
  yield takeLatest(types.REMOVE_COLLECTION_BOOKS_REQUEST, AsyncDeleteCollectionBookRequest);
  yield takeLatest(types.FETCH_OTHER_USER_COLLECTION_REQUEST, AsyncFetchOtherUserCollectionRequest);
}
