import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/_index/requestEntity';
import { types } from '../../src/ducks';

describe('requestEntity', () => {
  describe('fetchBookAndUser test', () => {
    it('should ready > call > success', () => {
      const bid = 1;
      const gen = re.fetchBookAndUser(bid);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOK_AND_USER.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBookAndUser.api, bid));

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOK_AND_USER.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('fetchBooksAndUsers test', () => {
    it('should ready > call > fetch > success', () => {
      const nof = 1;
      const page = 0;
      const gen = re.fetchBooksAndUsers(nof, page);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsers.api, nof, page));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsers.fetch, undefined));
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('fetchBooksAndUsersByTag test', () => {
    it('should ready > call > fetch > success', () => {
      const bid = 3;
      const nof = 1;
      const page = 0;
      const gen = re.fetchBooksAndUsersByTag(bid, nof, page);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsersByTag.api, bid, nof, page));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsersByTag.fetch, undefined));
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('fetchBooksAndUsersByAuthorTag test', () => {
    it('should ready > call > fetch > success', () => {
      const bid = 3;
      const nof = 1;
      const page = 0;
      const gen = re.fetchBooksAndUsersByAuthorTag(bid, nof, page);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsersByAuthorTag.api, bid, nof, page));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksAndUsersByAuthorTag.fetch, undefined));
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('fetchBooksByCollection test', () => {
    it('should ready > call > success', () => {
      const cid = 1;
      const gen = re.fetchBooksByCollection(cid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksByCollection.api, cid));
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_COLLECTION.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('fetchBooksByUser test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const gen = re.fetchBooksByUser(uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_USER.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.fetchBooksByUser.api, uid));
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_USER.SUCCESS,
          payload: {}
        }));
    });
  });
});
