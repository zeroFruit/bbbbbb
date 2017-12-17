import { call, put } from 'redux-saga/effects';
import agent from '../../src/Agent';
import * as saga from '../../src/sagas/bookmark';
import { types } from '../../src/ducks/bookmark';
import { requestEntity as re } from '../../src/sagas/bookmark/requestEntity';

describe('bookmark saga test', () => {
  describe('AsyncAddBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: [1, 2]
      };
      const uid = 1;

      const gen = saga.AsyncAddBookmarkRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.addBookmark, params.payload, uid));
    });
  });


  describe('AsyncRemoveBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: 1
      };
      const uid = 1;
      const gen = saga.AsyncRemoveBookmarkRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.removeBookmark, params.payload, uid));
    });
  });


  describe('AsyncFetchBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: 1
      };
      const gen = saga.AsyncFetchBookmarkRequest(params);
      expect(gen.next().value)
        .toEqual(call(re.fetchBookmark, params.payload));
    });
  });
});
