import { fork, all, takeLatest, put, call } from 'redux-saga/effects';
import { types } from '../ducks';
import { types as pageTypes } from '../ducks/page';
import agent from '../Agent';

import bookmark from './bookmark';
import user, {
  AsyncFetchUsersByUserIds,
  AsyncFetchUsersByUserIdsForPostList,
  AsyncFetchSelectedUserInfoRequest
} from './user';
import book, {
  AsyncFetchBooksByTagId,
  AsyncFetchBooksByAuthorTagId,
  AsyncFetchBooks,
  AsyncFetchBooksByIds,
  AsyncFetchBooksByUserId
} from './book';
import tag from './tag';
import collection from './collection';
import search from './search';

// 뉴스피드
export function* AsyncFetchBooksAndUsersRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_READY
  });

  const books = yield* AsyncFetchBooks(action);
  const users = books.map(book => book.user_id);
  const Users = yield* AsyncFetchUsersByUserIds({ payload: { users } });

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

export function* AsyncFetchBooksAndUsersByAuthorTagRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG_READY
  });
  const filteredBooks = yield* AsyncFetchBooksByAuthorTagId(action);

  const users = filteredBooks.map(book => book.user_id);
  yield* AsyncFetchUsersByUserIdsForPostList({ payload: { users } });

  yield put({
    type: pageTypes.NEXT_SELECTED_LIST_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG_SUCCESS
  });
}

export function* AsyncFetchBooksWithCollection(action) {
  yield put({
    type: types.FETCH_BOOKS_BY_COLLECTION_READY
  });
  const Collection = yield call(agent.Collection.fetchById, action.payload);
  yield* AsyncFetchBooksByIds({ payload: Collection.book_ids });
  yield put({
    type: types.FETCH_BOOKS_BY_COLLECTION_SUCCESS
  });
}

export function* AsyncFetchBooksByUser(action) {
  yield put({
    type: types.FETCH_BOOKS_BY_USER_READY
  });
  const User = yield* AsyncFetchSelectedUserInfoRequest(action);
  const books = yield* AsyncFetchBooksByUserId({ payload: User.books });
  yield put({
    type: types.FETCH_BOOKS_BY_USER_SUCCESS
  });
}

const index =  function* indexSaga() {
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_REQUEST, AsyncFetchBooksAndUsersRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_TAG_REQUEST, AsyncFetchBooksAndUsersByTagRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG_REQUEST, AsyncFetchBooksAndUsersByAuthorTagRequest);
  yield takeLatest(types.FETCH_BOOKS_BY_COLLECTION_REQUEST, AsyncFetchBooksWithCollection);
  yield takeLatest(types.FETCH_BOOKS_BY_USER_REQUEST, AsyncFetchBooksByUser);
};

export default function* rootSaga() {
  yield all([
    fork(index),
    fork(bookmark),
    fork(user),
    fork(book),
    fork(tag),
    fork(collection),
    fork(search)
  ]);
}
