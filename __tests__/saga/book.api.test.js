import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/book/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchBookApi test', () => {
    it('should request user book', () => {
      const bid = 1;
      const gen = api.fetchBookApi(bid);
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookId, bid));
    });
  });

  describe('fetchBooksApi test', () => {
    it('should request user books', () => {
      const nof = 3;
      const page = 1;
      const gen = api.fetchBooksApi(nof, page);
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetch, nof, page));
    });
  });

  describe('fetchBooksByBookIdApi test', () => {
    it('should request user books', () => {
      const bid = 0;
      const nof = 3;
      const page = 1;
      const title = 'title tag';
      const author = 'author tag';
      const gen = api.fetchBooksByBookIdApi(bid, nof, page);
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookId, bid))
      expect(gen.next({
        title_tag_id: title,
        author_tag_id: author
      }).value)
        .toEqual(call(agent.Book.fetchByTag, title, author, nof, page));
    });
  });
});
