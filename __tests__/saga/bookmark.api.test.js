import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/bookmark/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('addBookmarkApi test', () => {
    it('should request add bookmark', () => {
      const bid = 1;
      const uid = 1;
      const gen = api.addBookmarkApi(bid, uid);
      expect(gen.next().value)
        .toEqual(call(agent.Bookmark.addByBookId, bid, uid));
    });
  });


  describe('removeBookmarkApi test', () => {
    it('should request remove bookmark', () => {
      const bid = 1;
      const uid = 1;
      const gen = api.removeBookmarkApi(bid, uid);
      expect(gen.next().value)
        .toEqual(call(agent.Bookmark.removeByBookId, bid, uid));
    });
  });


  describe('fetchBookmarkApi test', () => {
    it('should request fetch bookmark', () => {
      const uid = 1;
      const gen = api.fetchBookmarkApi(uid);
      expect(gen.next().value)
        .toEqual(call(agent.Bookmark.fetchByUserId, uid));
    });
  });
});
