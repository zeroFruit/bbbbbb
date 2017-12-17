import {
  requestData as rd
} from '../../src/sagas/_index/requestEntity';
import * as api from '../../src/sagas/_index/apiEntity';
import * as cmn from '../../src/sagas/_common';
import { types } from '../../src/ducks';

describe('requestData', () => {
  describe('fetchBookAndUser test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBookAndUser.ready())
        .toEqual({
          type: types.FETCH_BOOK_AND_USER.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBookAndUser.success())
        .toEqual({
          type: types.FETCH_BOOK_AND_USER.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      const gen1 = rd.fetchBookAndUser.api(bid);
      const gen2 = api.fetchBookAndUserApi(bid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('fetchBooksAndUsers test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBooksAndUsers.ready())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBooksAndUsers.success())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const nof = 3;
      const page = 1;
      const gen1 = rd.fetchBooksAndUsers.api(nof, page);
      const gen2 = api.fetchBooksAndUsersApi(nof, page);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });

    it('should put next newsfeed page', () => {
      const gen1 = rd.fetchBooksAndUsers.fetch();
      const gen2 = cmn.NextNewsfeedPage();
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('fetchBooksAndUsersByTag test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBooksAndUsersByTag.ready())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBooksAndUsersByTag.success())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      const nof = 3;
      const page = 1;
      const gen1 = rd.fetchBooksAndUsersByTag.api(bid, nof, page);
      const gen2 = api.fetchBooksAndUsersByTagApi(bid, nof, page);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });

    it('should put next selected list page', () => {
      const gen1 = rd.fetchBooksAndUsersByTag.fetch();
      const gen2 = cmn.NextSelectedPage();
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('fetchBooksAndUsersByAuthorTag test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBooksAndUsersByAuthorTag.ready())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBooksAndUsersByAuthorTag.success())
        .toEqual({
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      const nof = 3;
      const page = 1;
      const gen1 = rd.fetchBooksAndUsersByAuthorTag.api(bid, nof, page);
      const gen2 = api.fetchBooksAndUsersByAuthorTagApi(bid, nof, page);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });

    it('should put next selected list page', () => {
      const gen1 = rd.fetchBooksAndUsersByAuthorTag.fetch();
      const gen2 = cmn.NextSelectedPage();
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('fetchBooksByCollection test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBooksByCollection.ready())
        .toEqual({
          type: types.FETCH_BOOKS_BY_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBooksByCollection.success())
        .toEqual({
          type: types.FETCH_BOOKS_BY_COLLECTION.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const cid = 1;
      const gen1 = rd.fetchBooksByCollection.api(cid);
      const gen2 = api.fetchBooksByCollectionApi(cid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('fetchBooksByUser test', () => {
    it('should patch type when ready', () => {
      expect(rd.fetchBooksByUser.ready())
        .toEqual({
          type: types.FETCH_BOOKS_BY_USER.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.fetchBooksByUser.success())
        .toEqual({
          type: types.FETCH_BOOKS_BY_USER.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const uid = 1;
      const gen1 = rd.fetchBooksByUser.api(uid);
      const gen2 = api.fetchBooksByUserApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
