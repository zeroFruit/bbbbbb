import { types } from '../../ducks/bookmark';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';

export const requestData = {
  addBookmark: {
    ready: () => patch(types.ADD_BOOKMARK.READY),
    success: pl => patch(types.ADD_BOOKMARK.SUCCESS, pl),
    api: (bid, uid) => api.addBookmarkApi(bid, uid)
  },
  removeBookmark: {
    ready: () => patch(types.REMOVE_BOOKMARK.READY),
    success: pl => patch(types.REMOVE_BOOKMARK.SUCCESS, pl),
    api: (bid, uid) => api.removeBookmarkApi(bid, uid)
  },
  fetchBookmark: {
    ready: () => patch(types.FETCH_BOOKMARK.READY),
    success: pl => patch(types.FETCH_BOOKMARK.SUCCESS, pl),
    api: uid => api.fetchBookmarkApi(uid)
  }
};

export const requestEntity = {
  addBookmark: fetchEntity.bind(null, requestData.addBookmark),
  removeBookmark: fetchEntity.bind(null, requestData.removeBookmark),
  fetchBookmark: fetchEntity.bind(null, requestData.fetchBookmark)
};
