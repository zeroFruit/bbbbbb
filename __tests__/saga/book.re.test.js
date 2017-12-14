import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/book/requestEntity';
import * as api from '../../src/sagas/book/apiEntity';
import { types } from '../../src/ducks/book';

describe('requestData', () => {
  describe('myBooks test', () => {
    it('should patch type when ready', () => {
      expect(rd.myBooks.ready())
        .toEqual({
          type: types.FETCH_MY_BOOKS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const myBookList = [{ id: 1 }, { id: 2 }];
      expect(rd.myBooks.success(myBookList))
        .toEqual({
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: myBookList
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      expect(rd.myBooks.api(bid))
        .toEqual(api.fetchBookApi(bid));
    });
  });

  describe('selectedBook test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedBook.ready())
        .toEqual({
          type: types.FETCH_BOOK.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const book = {}
      expect(rd.selectedBook.success(book))
        .toEqual({
          type: types.FETCH_BOOK.SUCCESS,
          payload: book
        });
    });

    it('should call matching api', () => {
      const bid = 0;
      expect(rd.selectedBook.api(bid))
        .toEqual(api.fetchBookApi(bid));
    });
  });

  describe('selectedBooks test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedBooks.ready())
        .toEqual({
          type: types.FETCH_BOOKS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const books = [{}, {}];
      expect(rd.selectedBooks.success(books))
        .toEqual({
          type: types.FETCH_BOOKS.SUCCESS,
          payload: books
        });
    });

    it('should call matching api', () => {
      const nof = 3;
      const page = 0;
      expect(rd.selectedBooks.api(nof, page))
        .toEqual(api.fetchBooksApi(nof, page));
    });
  });


  describe('selectedBooksByTag test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedBooksByTag.ready())
        .toEqual({
          type: types.FETCH_BOOKS_BY_TAG.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const books = [{}, {}];
      expect(rd.selectedBooksByTag.success(books))
        .toEqual({
          type: types.FETCH_BOOKS_BY_TAG.SUCCESS,
          payload: books
        });
    });

    it('should call matching api', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen1 = rd.selectedBooksByTag.api(bid, nof, page);
      const gen2 = api.fetchBooksByBookIdApi(bid, nof, page);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('selectedBooksByAuthorTag test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedBooksByAuthorTag.ready())
        .toEqual({
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const books = [{}, {}];
      expect(rd.selectedBooksByAuthorTag.success(books))
        .toEqual({
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS,
          payload: books
        });
    });

    it('should call matching api', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen1 = rd.selectedBooksByAuthorTag.api(bid, nof, page);
      const gen2 = api.fetchBooksByAuthorTagIdApi(bid, nof, page);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});

describe('requestEntity', () => {
  describe('myBooks test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const gen = re.myBooks(params.payload);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_MY_BOOKS.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.myBooks.api, params.payload));

      const result = [{ id: 1 }, { id: 2 }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: result
        }));
    });
  });

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
});
