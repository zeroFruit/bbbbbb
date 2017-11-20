import { fork, all, takeLatest, put, call } from 'redux-saga/effects';
import { types } from '../ducks';
import { types as pageTypes } from '../ducks/page';

import bookmark from './bookmark';
import user, { AsyncFetchUsersByUserIds, AsyncFetchUsersByUserIdsForPostList } from './user';
import book, { AsyncFetchBooksByTagId, AsyncFetchBooks } from './book';
import tag from './tag';
import collection from './collection';

// 뉴스피드
export function* AsyncFetchBooksAndUsersRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_READY
  });

  const books = yield* AsyncFetchBooks(action);
  // console.log('saga 1', books);
  const users = books.map(book => book.user_id);
  const Users = yield* AsyncFetchUsersByUserIds({ payload: { users } });
  // console.log('saga 2', Users);

  yield put({
    type: pageTypes.NEXT_NEWSFEED_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_SUCCESS
  });
}

// 선택한 책 리스트
export function* AsyncFetchBooksAndUsersByTagRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG_READY
  });

  const filteredBooks = yield* AsyncFetchBooksByTagId(action);

  const users = filteredBooks.map(book => book.user_id);
  yield* AsyncFetchUsersByUserIdsForPostList({ payload: { users } });

  yield put({
    type: pageTypes.NEXT_SELECTED_LIST_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG_SUCCESS
  });
}

const index =  function* indexSaga() {
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_REQUEST, AsyncFetchBooksAndUsersRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_TAG_REQUEST, AsyncFetchBooksAndUsersByTagRequest);
}

export default function* rootSaga() {
  yield all([
    fork(index),
    fork(bookmark),
    fork(user),
    fork(book),
    fork(tag),
    fork(collection)
  ]);
}
