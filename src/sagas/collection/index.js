import { call, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/collection';
import { requestEntity as re } from './requestEntity';
import { USER_ID } from '../../config';

export function* AsyncFetchCollectionRequest(action) {
  const result = yield call(re.myCollections, USER_ID);
  return result;
}

export function* AsyncAddCollectionRequest(action) {
  const { label, bookIds } = action.payload;
  const result = yield call(re.addCollection, USER_ID, label, bookIds);
  return result;
}

export function* AsyncDeleteCollectionRequest(action) {
  const result = yield call(re.removeCollection, action.payload);
  return result;
}

export function* AsyncAddBooksToCollectionRequest(action) {
  const { id, bookIds } = action.payload;
  const result = yield call(re.addBooksToCollection, id, bookIds);
  return result;
}

export function* AsyncDeleteCollectionBookRequest(action) {
  const { id, bookIds } = action.payload;
  const result = yield call(re.removeBooksInCollection, id, bookIds);
  return result;
}

export function* AsyncFetchOtherUserCollectionRequest(action) {
  const result = yield call(re.otherUserCollections, action.payload);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_COLLECTION.REQUEST, AsyncFetchCollectionRequest);
  yield takeLatest(types.ADD_COLLECTION.REQUEST, AsyncAddCollectionRequest);
  yield takeLatest(types.REMOVE_COLLECTION.REQUEST, AsyncDeleteCollectionRequest);
  yield takeLatest(types.ADD_BOOKS_TO_COLLECTION.REQUEST, AsyncAddBooksToCollectionRequest);
  yield takeLatest(types.REMOVE_COLLECTION_BOOKS.REQUEST, AsyncDeleteCollectionBookRequest);
  yield takeLatest(types.FETCH_OTHER_USER_COLLECTION.REQUEST, AsyncFetchOtherUserCollectionRequest);
}
