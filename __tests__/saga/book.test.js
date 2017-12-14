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
    it('success', () => {
      const gen = saga.AsyncFetchBook(params);

      expect(gen.next(params).value)
        .toEqual(call(re.myBooks, params.payload));
    });
  });


  describe('AsyncFetchBooks', () => {
    const params = {
      payload: {
        numOfFeeds: 3,
        page: 0
      }
    };
    it('success', () => {
      const gen = saga.AsyncFetchBooks(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS.READY }));

      const { numOfFeeds, page } = params.payload;
      expect(gen.next({
        numOfFeeds,
        page
      }).value)
        .toEqual(call(agent.Book.fetch, numOfFeeds, page));
      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS.SUCCESS }));
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
    it('success', () => {
      const gen = saga.AsyncFetchBooksByIdForSameTag(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS_BY_TAG.READY }));
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookId, params.payload.id));

      const result = {
        title_tag_id: 1,
        author_tag_id: 1
      };

      expect(gen.next({
        ...result,
        numOfFeeds: params.numOfFeeds,
        page: params.page
      }).value)
        .toEqual(call(
          agent.Book.fetchByTag,
          result.title_tag_id,
          result.author_tag_id,
          params.payload.numOfFeeds,
          params.payload.page
        ));

      const filteredBooks = [];
      expect(gen.next(filteredBooks).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_TAG.SUCCESS,
          payload: filteredBooks
        }));
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
    it('success', () => {
      const gen = saga.AsyncFetchBooksByAuthorTagId(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS_BY_AUTHOR_TAG.READY }));

      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookId, params.payload.id));

      const result = {
        author_tag_id: 1
      };
      expect(gen.next({
        ...result,
        numOfFeeds: params.numOfFeeds,
        page: params.page
      }).value)
        .toEqual(call(
          agent.Book.fetchByAuthorTag,
          result.author_tag_id,
          params.payload.numOfFeeds,
          params.payload.page
        ));

      const filteredBooks = [];
      expect(gen.next(filteredBooks).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS,
          payload: filteredBooks
        }));
    });
  });


  describe('AsyncFetchBooksByIds', () => {
    const params = {
      payload: [1, 2]
    };

    it('success', () => {
      const gen = saga.AsyncFetchBooksByIds(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS_FOR_COLLECTION.READY }));
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookIds, params.payload));

      const books = [{ id: 1 }, { id: 2 }];
      expect(gen.next(books).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS,
          payload: books
        }));
    });
  });


  describe('AsyncFetchBooksByUserId', () => {
    const params = {
      payload: 1
    };

    it('success', () => {
      const gen = saga.AsyncFetchBooksByUserId(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.FETCH_BOOKS_FOR_USER.READY }));
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookIds, params.payload));

      const books = [{ id: 1 }, { id: 2 }];
      expect(gen.next(books).value)
        .toEqual(put({
          type: types.FETCH_BOOKS_FOR_USER.SUCCESS,
          payload: books
        }));
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
    it('success', () => {
      const gen = saga.AsyncAddBook(params);

      expect(gen.next().value)
        .toEqual(put({ type: types.ADD_BOOK.READY }));
      expect(gen.next().value)
        .toEqual(call(
          agent.Book.insert,
          pickByKey(params.payload, ['img_src', 'content', 'user_id'])
        ));

      const book = {
        id: 1
      };
      expect(gen.next({
        id: book.id,
        bookTitle: params.payload.bookTitle,
        bookAuthor: params.payload.bookAuthor
      }).value)
        .toEqual(call(
          agent.Search.fetchBookTagIdAndAuthorTagIdByText,
          book.id,
          params.payload.bookTitle,
          params.payload.bookAuthor
        ));

      const tag = {
        title_tag_id: 1,
        author_tag_id: 1
      };
      expect(gen.next({
        id: book.id,
        title_tag_id: tag.title_tag_id,
        author_tag_id: tag.author_tag_id
      }).value)
        .toEqual(call(
          agent.Book.updateTagIds,
          book.id,
          tag.title_tag_id,
          tag.author_tag_id
        ));

      const USER_ID = 1;
      expect(gen.next({
        USER_ID,
        id: book.id
      }).value)
        .toEqual(call(
          agent.User.insertBook,
          USER_ID,
          book.id
        ));

      expect(gen.next().value)
        .toEqual(put({
          type: types.ADD_BOOK.SUCCESS
        }));
    });
  });
});
