import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/book/requestEntity';
import { types } from '../../src/ducks/book';

describe('requestEntity', () => {
  // describe('myBooks test', () => {
  //   it('should ready > call > success', () => {
  //     const params = {
  //       payload: 1
  //     };
  //     const gen = re.myBooks(params.payload);
  //     expect(gen.next().value)
  //       .toEqual(put({
  //         type: types.FETCH_MY_BOOKS.READY,
  //         payload: {}
  //       }));
  //     expect(gen.next().value)
  //       .toEqual(call(rd.myBooks.api, params.payload));
  //
  //     const result = [{ id: 1 }, { id: 2 }];
  //     expect(gen.next(result).value)
  //       .toEqual(put({
  //         type: types.FETCH_MY_BOOKS.SUCCESS,
  //         payload: result
  //       }));
  //   });
  // });

  describe('selectedBook test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const gen = re.selectedBook(params.payload);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOK.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBook.api, params.payload));

      const result = {};
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOK.SUCCESS,
          payload: result
        }));
    });
  });

  describe('selectedBooks test', () => {
    it('should ready > call > success', () => {
      const nof = 3;
      const page = 0;
      const gen = re.selectedBooks(nof, page);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBooks.api, nof, page));

      const result = [];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKS.SUCCESS,
          payload: result
        }));
    });
  });

  describe('selectedBooksByTag test', () => {
    it('should ready > call > success', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen = re.selectedBooksByTag(bid, nof, page);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_TAG.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBooksByTag.api, bid, nof, page));

      const result = [];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_TAG.SUCCESS,
          payload: result
        }));
    });
  });

  describe('selectedBooksByAuthorTag test', () => {
    it('should ready > call > success', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen = re.selectedBooksByAuthorTag(bid, nof, page);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBooksByAuthorTag.api, bid, nof, page));

      const result = [];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS,
          payload: result
        }));
    });
  });

  describe('selectedBooksForCollection test', () => {
    it('should ready > call > success', () => {
      const books = [1, 2];
      const gen = re.selectedBooksForCollection(books);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBooksForCollection.api, books));

      const result = [];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS,
          payload: result
        }));
    });
  });


  describe('selectedBooksForCollection test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const gen = re.selectedBooksForUser(uid);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_USER.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedBooksForUser.api, uid));

      const result = [];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_USER.SUCCESS,
          payload: result
        }));
    });
  });
});
