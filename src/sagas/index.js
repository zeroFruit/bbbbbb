import { fork, all } from 'redux-saga/effects';
import bookmark from './bookmark';
import user from './user';
import book from './book';
import tag from './tag';
import collection from './collection';

export default function* rootSaga() {
  yield all([
    fork(bookmark),
    fork(user),
    fork(book),
    fork(tag),
    fork(collection)
  ]);
}
