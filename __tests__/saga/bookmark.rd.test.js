import {
  requestData as rd,
} from '../../src/sagas/bookmark/requestEntity';
import * as api from '../../src/sagas/bookmark/apiEntity';
import { types } from '../../src/ducks/bookmark';

describe('requestData', () => {
  describe('addBookmark test', () => {
    it('should patch type when ready', () => {
      expect(rd.addBookmark.ready())
        .toEqual({
          type: types.ADD_BOOKMARK.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const bookmarksList = [1, 2];
      expect(rd.addBookmark.success(bookmarksList))
        .toEqual({
          type: types.ADD_BOOKMARK.SUCCESS,
          payload: bookmarksList
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      const uid = 1;
      expect(rd.addBookmark.api(bid, uid))
        .toEqual(api.addBookmarkApi(bid, uid));
    });
  });


  describe('removeBookmark test', () => {
    it('should patch type when ready', () => {
      expect(rd.removeBookmark.ready())
        .toEqual({
          type: types.REMOVE_BOOKMARK.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const bid = 1;
      expect(rd.removeBookmark.success(bid))
        .toEqual({
          type: types.REMOVE_BOOKMARK.SUCCESS,
          payload: bid
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      const uid = 1;
      expect(rd.removeBookmark.api(bid, uid))
        .toEqual(api.removeBookmarkApi(bid, uid));
    });
  });


  describe('fetchBookmark test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBookmark.ready())
        .toEqual({
          type: types.FETCH_BOOKMARK.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const bookmarksList = [1, 2];
      expect(rd.fetchBookmark.success(bookmarksList))
        .toEqual({
          type: types.FETCH_BOOKMARK.SUCCESS,
          payload: bookmarksList
        });
    });

    it('should call matching api', () => {
      const uid = 1;
      const gen1 = rd.fetchBookmark.api(uid);
      const gen2 = api.fetchBookmarkApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
