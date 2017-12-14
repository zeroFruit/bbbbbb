import { call, put } from 'redux-saga/effects';
import agent from '../../src/Agent';
import * as saga from '../../src/sagas/book';
import { requestEntity as re } from '../../src/sagas/book/requestEntity';
import { types } from '../../src/ducks/book';

import { pickByKey } from '../../src/utils/ObjectUtils';

describe('book saga test', () => {
  describe('AsyncFetchBook', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity selectedBook', () => {
      const gen = saga.AsyncFetchBook(params);

      expect(gen.next(params).value)
        .toEqual(call(re.selectedBook, params.payload));
    });
  });


  describe('AsyncFetchBooks', () => {
    const params = {
      payload: {
        numOfFeeds: 3,
        page: 0
      }
    };
    it('should call requestEntity selectedBooks', () => {
      const gen = saga.AsyncFetchBooks(params);

      expect(gen.next().value)
        .toEqual(call(re.selectedBooks, 3, 0));
    });
  });


  describe('AsyncFetchBooksByIdForSameTag', () => {
    const params = {
      payload: {
        id: 1,
        numOfFeeds: 3,
        page: 0
      }
    };
    it('should call requestEntity selectedBooksByTag', () => {
      const gen = saga.AsyncFetchBooksByIdForSameTag(params);
      expect(gen.next().value)
        .toEqual(call(re.selectedBooksByTag, 1, 3, 0));
    });
  });


  describe('AsyncFetchBooksByAuthorTagId', () => {
    const params = {
      payload: {
        id: 1,
        numOfFeeds: 3,
        page: 0
      }
    };
    it('should call requestEntity selectedBooksByAuthorTagId', () => {
      const gen = saga.AsyncFetchBooksByAuthorTagId(params);
      expect(gen.next().value)
        .toEqual(call(re.selectedBooksByAuthorTag, 1, 3, 0));
    });
  });


  describe('AsyncFetchBooksByIds', () => {
    const params = {
      payload: [1, 2]
    };

    it('should call requestEntity selectedBooksForCollection', () => {
      const gen = saga.AsyncFetchBooksByIds(params);
      expect(gen.next().value)
        .toEqual(call(re.selectedBooksForCollection, params.payload));
    });
  });


  describe('AsyncFetchBooksByUserId', () => {
    const params = {
      payload: 1
    };

    it('should call requestEntity selectedBooksForUser', () => {
      const gen = saga.AsyncFetchBooksByUserId(params);
      expect(gen.next().value)
        .toEqual(call(re.selectedBooksForUser, params.payload));
    });
  });


  describe('AsyncAddBook', () => {
    const params = {
      payload: {
        img_src: 'src',
        content: 'content',
        user_id: 1,
        bookAuthor: 'author',
        bookTitle: 'title'
      }
    };
    it('should call requestEntity addBook', () => {
      const gen = saga.AsyncAddBook(params);
      expect(gen.next().value)
        .toEqual(call(re.addBook, params.payload));
    });
  });
});
