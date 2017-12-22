import { call, all } from 'redux-saga/effects';
import agent from '../../Agent';

export function* fetchCollectionsApi(uid) {
  const result = yield call(agent.User.__fetchCollections, uid);
  return result;
}

export function* addCollectionsApi(uid, label, bids) {
  yield call(agent.Collection.__insertCollection, uid, label, bids);
}

export function* removeCollectionsApi(cid, uid) {
  yield call(agent.Collection.__deleteCollection, cid);
}

export function* addBooksToCollectionApi(cid, bids) {
  const tasks = bids.map(bid =>
    call(agent.Collection.__updateBookToCollection, cid, bid));
  const result = yield all(tasks);
  return result;
}

export function* removeBooksInCollectionApi(cid, bid) {
  yield call(agent.Collection.__deleteCollectionBooks, cid, bid);
}

export function* fetchOtherUserCollectionApi(uid) {
  const result = yield call(agent.User.__fetchCollections, uid);
  return result;
}
