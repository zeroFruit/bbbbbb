import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchCollectionsApi(uid) {
  const user = yield call(agent.User.fetchByUserId, uid);
  const result = yield call(agent.Collection.fetchByIds, user.collections);
  return result;
}

export function* addCollectionsApi(uid, label, bids) {
  const result = yield call(agent.Collection.insertCollection, label, bids);
  yield call(agent.User.insertCollection, uid, result.id);
  return result;
}

export function* removeCollectionsApi(cid, uid) {
  const result = yield call(agent.Collection.deleteCollection, cid);
  yield call(agent.User.deleteCollection, uid, result.id);
  return result;
}

export function* addBooksToCollectionApi(cid, bids) {
  const result = yield call(agent.Collection.updateBooksToCollection, cid, bids);
  return result;
}

export function* removeBooksInCollectionApi(cid, bids) {
  const result = yield call(agent.Collection.deleteCollectionBooks, cid, bids);
  return result;
}

export function* fetchOtherUserCollectionApi(uid) {
  const user = yield call(agent.User.fetchByUserId, uid);
  const result = yield call(agent.Collection.fetchByIds, user.collections);
  return result;
}
