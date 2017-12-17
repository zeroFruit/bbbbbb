import { call, put } from 'redux-saga/effects';
import agent from '../../src/Agent';
import * as saga from '../../src/sagas/_index';
import { requestEntity as re } from '../../src/sagas/_index/requestEntity';

describe('_index saga test', () => {
  describe('AsyncFetchBookAndUserRequest', () => {
    const params = {
      payload: {
        bookId: 1
      }
    };
    it('should call requestEntity fetchBookAndUser', () => {
      const gen = saga.AsyncFetchBookAndUserRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBookAndUser, params.payload.bookId));
    });
  });


  describe('AsyncFetchBooksAndUsersRequest', () => {
    const params = {
      payload: {
        numOfFeeds: 1,
        page: 0
      }
    };
    it('should call requestEntity fetchBooksAndUsers', () => {
      const gen = saga.AsyncFetchBooksAndUsersRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBooksAndUsers, 1, 0));
    });
  });


  describe('AsyncFetchBooksAndUsersByTagRequest', () => {
    const params = {
      payload: {
        id: 3,
        numOfFeeds: 1,
        page: 0
      }
    };
    it('should call requestEntity fetchBooksAndUsersByTag', () => {
      const gen = saga.AsyncFetchBooksAndUsersByTagRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBooksAndUsersByTag, 3, 1, 0));
    });
  });


  describe('AsyncFetchBooksAndUsersByAuthorTagRequest', () => {
    const params = {
      payload: {
        id: 3,
        numOfFeeds: 1,
        page: 0
      }
    };
    it('should call requestEntity fetchBooksAndUsersByAuthorTag', () => {
      const gen = saga.AsyncFetchBooksAndUsersByAuthorTagRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBooksAndUsersByAuthorTag, 3, 1, 0));
    });
  });


  describe('AsyncFetchBooksWithCollection', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity fetchBooksByCollection', () => {
      const gen = saga.AsyncFetchBooksWithCollection(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBooksByCollection, 1));
    });
  });


  describe('AsyncFetchBooksByUser', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity fetchBooksByUser', () => {
      const gen = saga.AsyncFetchBooksByUser(params);

      expect(gen.next(params).value)
        .toEqual(call(re.fetchBooksByUser, 1));
    });
  });
});
