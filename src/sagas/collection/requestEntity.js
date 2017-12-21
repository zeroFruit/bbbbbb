import { types } from '../../ducks/collection';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  myCollections: {
    ready: () => patch(types.FETCH_COLLECTION.READY),
    success: pl => patch(types.FETCH_COLLECTION.SUCCESS, pl),
    api: uid => api.fetchCollectionsApi(uid)
  },
  addCollection: {
    ready: () => patch(types.ADD_COLLECTION.READY),
    success: () => patch(types.ADD_COLLECTION.SUCCESS),
    api: (uid, label, bids) => api.addCollectionsApi(uid, label, bids)
  },
  removeCollection: {
    ready: () => patch(types.REMOVE_COLLECTION.READY),
    success: () => patch(types.REMOVE_COLLECTION.SUCCESS),
    api: cid => api.removeCollectionsApi(cid)
  },
  addBooksToCollection: {
    ready: () => patch(types.ADD_BOOKS_TO_COLLECTION.READY),
    success: () => patch(types.ADD_BOOKS_TO_COLLECTION.SUCCESS),
    api: (cid, bids) => api.addBooksToCollectionApi(cid, bids),
    fetch: result => cmn.FetchBooksForCollection(result)
  },
  removeBooksInCollection: {
    ready: () => patch(types.REMOVE_COLLECTION_BOOKS.READY),
    success: () => patch(types.REMOVE_COLLECTION_BOOKS.SUCCESS),
    api: (cid, bid) => api.removeBooksInCollectionApi(cid, bid)
  },
  otherUserCollections: {
    ready: () => patch(types.FETCH_OTHER_USER_COLLECTION.READY),
    success: pl => patch(types.FETCH_OTHER_USER_COLLECTION.SUCCESS, pl),
    api: uid => api.fetchOtherUserCollectionApi(uid)
  }
};

export const requestEntity = {
  myCollections: fetchEntity.bind(null, requestData.myCollections),
  addCollection: fetchEntity.bind(null, requestData.addCollection),
  removeCollection: fetchEntity.bind(null, requestData.removeCollection),
  addBooksToCollection: fetchEntity.bind(null, requestData.addBooksToCollection),
  removeBooksInCollection: fetchEntity.bind(null, requestData.removeBooksInCollection),
  otherUserCollections: fetchEntity.bind(null, requestData.otherUserCollections)
};
