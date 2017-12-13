import { call, put } from 'redux-saga/effects';
import agent from '../../src/Agent';
import * as saga from '../../src/sagas/bookmark';
import { types } from '../../src/ducks/bookmark';


describe('bookmark saga test', () => {
  describe('AsyncFetchBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: 1
      };
      const gen = saga.AsyncFetchBookmarkRequest(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKMARK.READY }));
      expect(gen.next(params).value)
        .toEqual(call(agent.Bookmark.fetchByUserId, params.payload));

      const bookIds = [1, 2];
      expect(gen.next({
        book_ids: bookIds
      }).value)
        .toEqual(put({
          type: types.FETCH_BOOKMARK.SUCCESS,
          payload: bookIds
        }));
    });
  });

  describe('AsyncAddBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: [1, 2]
      };
      const USER_ID = 1;

      const gen = saga.AsyncAddBookmarkRequest(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.ADD_BOOKMARK.READY }));
      expect(gen.next({
        payload: params.payload,
        USER_ID
      }).value)
        .toEqual(call(agent.Bookmark.addByBookId, params.payload, USER_ID));
      expect(gen.next(params).value)
        .toEqual(put({
          type: types.ADD_BOOKMARK.SUCCESS,
          payload: params.payload
        }));
    });
  });

  describe('AsyncRemoveBookmarkRequest', () => {
    it('success', () => {
      const params = {
        payload: 1
      };
      const USER_ID = 1;

      const gen = saga.AsyncRemoveBookmarkRequest(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.REMOVE_BOOKMARK.READY }));
      expect(gen.next({
        payload: params.payload,
        USER_ID
      }).value)
        .toEqual(call(agent.Bookmark.removeByBookId, params.payload, USER_ID));
      expect(gen.next(params).value)
        .toEqual(put({
          type: types.REMOVE_BOOKMARK.SUCCESS,
          payload: params.payload
        }));
    })
  })
});
