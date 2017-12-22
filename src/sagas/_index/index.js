import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks';
import { requestEntity as re } from './requestEntity';

export function* AsyncFetchBookAndUserRequest(action) {
  const { bookId } = action.payload;
  yield call(re.fetchBookAndUser, bookId);
}

export function* AsyncFetchBooksAndUsersRequest(action) {
  const { numOfFeeds, page } = action.payload;
  yield call(re.fetchBooksAndUsers, numOfFeeds, page);
}

export function* AsyncFetchBooksAndUsersByBidRequest(action) {
  const { id, numOfFeeds, page } = action.payload;
  yield call(re.fetchBooksAndUsersByBid, id, numOfFeeds, page);
}

export function* AsyncFetchBooksAndUsersByTagRequest(action) {
  const { athrid, titid, numOfFeeds, page } = action.payload;
  yield call(re.fetchBooksAndUsersByTag, athrid, titid, numOfFeeds, page);
}

export function* AsyncFetchBooksAndUsersByAuthorTagRequest(action) {
  const { id, numOfFeeds, page } = action.payload;
  yield call(re.fetchBooksAndUsersByAuthorTag, id, numOfFeeds, page);
}

export function* AsyncFetchBooksWithCollection(action) {
  yield call(re.fetchBooksByCollection, action.payload);
}

export function* AsyncFetchBooksByUser(action) {
  yield call(re.fetchBooksByUser, action.payload);
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_BOOK_AND_USER.REQUEST, AsyncFetchBookAndUserRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS.REQUEST, AsyncFetchBooksAndUsersRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_BID.REQUEST, AsyncFetchBooksAndUsersByBidRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_TAG.REQUEST, AsyncFetchBooksAndUsersByTagRequest);
  yield takeLatest(types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.REQUEST, AsyncFetchBooksAndUsersByAuthorTagRequest);
  yield takeLatest(types.FETCH_BOOKS_BY_COLLECTION.REQUEST, AsyncFetchBooksWithCollection);
  yield takeLatest(types.FETCH_BOOKS_BY_USER.REQUEST, AsyncFetchBooksByUser);
}
