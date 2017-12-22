import { types } from '../../ducks';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  fetchBookAndUser: {
    ready: () => patch(types.FETCH_BOOK_AND_USER.READY),
    success: () => patch(types.FETCH_BOOK_AND_USER.SUCCESS),
    api: bid => api.fetchBookAndUserApi(bid)
  },
  fetchBooksAndUsers: {
    ready: () => patch(types.FETCH_BOOKS_AND_USERS.READY),
    success: () => patch(types.FETCH_BOOKS_AND_USERS.SUCCESS),
    api: (nof, page) => api.fetchBooksAndUsersApi(nof, page),
    fetch: () => cmn.NextNewsfeedPage()
  },
  fetchBooksAndUsersByBid: {
    ready: () => patch(types.FETCH_BOOKS_AND_USERS_BY_BID.READY),
    success: () => patch(types.FETCH_BOOKS_AND_USERS_BY_BID.SUCCESS),
    api: (bid, nof, page) => api.fetchBooksAndUsersByBidApi(bid, nof, page),
    fetch: () => cmn.NextSelectedPage()
  },
  fetchBooksAndUsersByTag: {
    ready: () => patch(types.FETCH_BOOKS_AND_USERS_BY_TAG.READY),
    success: () => patch(types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS),
    api: (athrid, titid, nof, page) => api.fetchBooksAndUsersByTagApi(athrid, titid, nof, page),
    fetch: () => cmn.NextSelectedPage()
  },
  fetchBooksAndUsersByAuthorTag: {
    ready: () => patch(types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY),
    success: () => patch(types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS),
    api: (bid, nof, page) => api.fetchBooksAndUsersByAuthorTagApi(bid, nof, page),
    fetch: () => cmn.NextSelectedPage()
  },
  fetchBooksByCollection: {
    ready: () => patch(types.FETCH_BOOKS_BY_COLLECTION.READY),
    success: () => patch(types.FETCH_BOOKS_BY_COLLECTION.SUCCESS),
    api: cid => api.fetchBooksByCollectionApi(cid)
  },
  fetchBooksByUser: {
    ready: () => patch(types.FETCH_BOOKS_BY_USER.READY),
    success: () => patch(types.FETCH_BOOKS_BY_USER.SUCCESS),
    api: uid => api.fetchBooksByUserApi(uid)
  }
};

export const requestEntity = {
  fetchBookAndUser: fetchEntity.bind(null, requestData.fetchBookAndUser),
  fetchBooksAndUsers: fetchEntity.bind(null, requestData.fetchBooksAndUsers),
  fetchBooksAndUsersByBid: fetchEntity.bind(null, requestData.fetchBooksAndUsersByBid),
  fetchBooksAndUsersByTag: fetchEntity.bind(null, requestData.fetchBooksAndUsersByTag),
  fetchBooksAndUsersByAuthorTag: fetchEntity.bind(null, requestData.fetchBooksAndUsersByAuthorTag),
  fetchBooksByCollection: fetchEntity.bind(null, requestData.fetchBooksByCollection),
  fetchBooksByUser: fetchEntity.bind(null, requestData.fetchBooksByUser)
};
