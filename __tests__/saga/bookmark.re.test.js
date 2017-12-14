import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/bookmark/requestEntity';
import { types } from '../../src/ducks/bookmark';

describe('requestEntity', () => {
  describe('addBookmark test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const uid = 1;
      const gen = re.addBookmark(params.payload, uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.ADD_BOOKMARK.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.addBookmark.api, params.payload, uid));

      const result = 1;
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.ADD_BOOKMARK.SUCCESS,
          payload: result
        }));
    });
  });


  describe('removeBookmark test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const uid = 1;
      const gen = re.removeBookmark(params.payload, uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_BOOKMARK.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.removeBookmark.api, params.payload, uid));

      const result = 1;
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.REMOVE_BOOKMARK.SUCCESS,
          payload: result
        }));
    });
  });


  describe('fetchBookmark test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const uid = 1;
      const gen = re.fetchBookmark(params.payload, uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKMARK.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBookmark.api, params.payload, uid));

      const result = 1;
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKMARK.SUCCESS,
          payload: result
        }));
    });
  });
});
