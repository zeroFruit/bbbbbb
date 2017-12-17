import { fork, all } from 'redux-saga/effects';
import bookmark from './bookmark';
import user from './user';
import book from './book';
import tag from './tag';
import collection from './collection';
import search from './search';
<<<<<<< HEAD
import _index from './_index';
=======

// 싱글 포스트
export function* AsyncFetchBookAndUserRequest(action) {
  yield put({
    type: types.FETCH_BOOK_AND_USER.READY
  });
  const { bookId } = action.payload;
  const Book = yield call(AsyncFetchBook, { payload: bookId });
  const User = yield call(AsyncFetchSelectedUserInfoRequest, { payload: Book.user_id });

  yield put({
    type: types.FETCH_BOOK_AND_USER.SUCCESS
  });
}
// 뉴스피드
export function* AsyncFetchBooksAndUsersRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS.READY
  });

  const books = yield* AsyncFetchBooks(action);
  const users = books.map(book => book.user_id);
  const Users = yield* AsyncFetchUsersByUserIds({ payload: { users } });

  yield put({
    type: pageTypes.NEXT_NEWSFEED_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS.SUCCESS
  });
}

// 선택한 책 리스트
export function* AsyncFetchBooksAndUsersByTagRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG.READY
  });

  const filteredBooks = yield* AsyncFetchBooksByIdForSameTag(action);

  const users = filteredBooks.map(book => book.user_id);
  yield* AsyncFetchUsersByUserIdsForPostList({ payload: { users } });

  yield put({
    type: pageTypes.NEXT_SELECTED_LIST_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS
  });
}

export function* AsyncFetchBooksAndUsersByAuthorTagRequest(action) {
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY
  });
  const filteredBooks = yield* AsyncFetchBooksByAuthorTagId(action);

  const users = filteredBooks.map(book => book.user_id);
  yield* AsyncFetchUsersByUserIdsForPostList({ payload: { users } });

  yield put({
    type: pageTypes.NEXT_SELECTED_LIST_PAGE
  });
  yield put({
    type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS
  });
}

export function* AsyncFetchBooksWithCollection(action) {
  yield put({
    type: types.FETCH_BOOKS_BY_COLLECTION.READY
  });
  const Collection = yield call(agent.Collection.fetchById, action.payload);
  yield* AsyncFetchBooksByIds({ payload: Collection.book_ids });
  yield put({
    type: types.FETCH_BOOKS_BY_COLLECTION.SUCCESS
  });
}

export function* AsyncFetchBooksByUser(action) {
  yield put({
    type: types.FETCH_BOOKS_BY_USER.READY
  });
  const User = yield* AsyncFetchSelectedUserInfoRequest(action);
  const books = yield* AsyncFetchBooksByUserId({ payload: User.books });
  yield put({
    type: types.FETCH_BOOKS_BY_USER.SUCCESS
  });
}

const index =  function* indexSaga() {
  yield takeLatest(types.FETCH_BOOK_AND_USER.REQUEST, AsyncFetchBookAndUserRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS.REQUEST, AsyncFetchBooksAndUsersRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_TAG.REQUEST, AsyncFetchBooksAndUsersByTagRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.REQUEST, AsyncFetchBooksAndUsersByAuthorTagRequest);
  yield takeLatest(types.FETCH_BOOKS_BY_COLLECTION.REQUEST, AsyncFetchBooksWithCollection);
  yield takeLatest(types.FETCH_BOOKS_BY_USER.REQUEST, AsyncFetchBooksByUser);
};
>>>>>>> debug

export default function* rootSaga() {
  yield all([
    fork(_index),
    fork(bookmark),
    fork(user),
    fork(book),
    fork(tag),
    fork(collection),
    fork(search)
  ]);
}
