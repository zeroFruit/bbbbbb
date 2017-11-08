import { fork, all } from 'redux-saga/effects';
import bookmark from './bookmark';

export default function* rootSaga() {
  yield all([
    fork(bookmark)
  ]);
}
