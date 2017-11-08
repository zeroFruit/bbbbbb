import { fork, all } from 'redux-saga/effects';
import bookmark from './bookmark';
import user from './user';

export default function* rootSaga() {
  yield all([
    fork(bookmark),
    fork(user)
  ]);
};
