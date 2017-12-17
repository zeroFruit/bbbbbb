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


  describe('addBookApi test', () => {
    it('should request user books', () => {
      const params = {
        img_src: 'src',
        content: 'content',
        user_id: 1,
        bookAuthor: 'author',
        bookTitle: 'title'
      };
      const bid = 1;
      const gen = api.addBookApi(params);
      expect(gen.next().value)
        .toEqual(call(agent.Book.insert, {
          img_src: params.img_src,
          content: params.content,
          user_id: params.user_id
        }));
        
      expect(gen.next({
        id: bid,
        bookdTitle: params.bookTitle,
        bookAuthor: params.bookAuthor
      }).value)
        .toEqual(call(
          agent.Search.fetchBookTagIdAndAuthorTagIdByText,
          bid,
          params.bookTitle,
          params.bookAuthor
        ));

      expect(gen.next({
        id: bid,
        title_tag_id: 1,
        author_tag_id: 1
      }).value)
        .toEqual(call(agent.Book.updateTagIds, bid, 1, 1));

      expect(gen.next({
        USER_ID: 1,
        id: bid
      }).value)
        .toEqual(call(agent.User.insertBook, 1, 1));
    });
  });
});
