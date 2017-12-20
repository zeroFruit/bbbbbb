import { call } from 'redux-saga/effects';
import agent from '../../Agent';

export function* addBookmarkApi(bid, uid) {
  yield call(agent.Bookmark.addByBookId, bid, uid);
  return bid;
}

export function* removeBookmarkApi(bid, uid) {
  yield call(agent.Bookmark.removeByBookId, bid, uid);
  return bid;
}

export function* fetchBookmarkApi(uid) {
  // GET /bookmarks/user/:id
  const result = yield call(agent.Bookmark.__fetchByUserId, uid);
  return result.map(b => b.id);
}
