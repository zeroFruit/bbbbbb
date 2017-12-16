import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/_index/apiEntity';
import { requestEntity as bre } from '../../src/sagas/book/requestEntity';
import { requestEntity as ure } from '../../src/sagas/user/requestEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchBookAndUserApi test', () => {
    it('should request user and book', () => {
      const bid = 1;
      const gen = api.fetchBookAndUserApi(bid);
      expect(gen.next().value)
        .toEqual(call(bre.selectedBook, bid));

      const uid = 1;
      expect(gen.next({
        user_id: uid
      }).value)
        .toEqual(call(ure.selectedUser, uid));
    });
  });


  describe('fetchBooksAndUsersApi test', () => {
    it('should request books and matching users', () => {
      const nof = 3;
      const page = 0;
      const gen = api.fetchBooksAndUsersApi(nof, page);
      expect(gen.next().value)
        .toEqual(call(bre.selectedBooks, nof, page));

      const books = [{ user_id: 1 }];
      expect(gen.next(books).value)
        .toEqual(call(ure.selectedUsers, [1]));
    });
  });


  describe('fetchBooksAndUsersByTagApi test', () => {
    it('should request books and users matching tag id', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen = api.fetchBooksAndUsersByTagApi(bid, nof, page);
      expect(gen.next().value)
        .toEqual(call(bre.selectedBooksByTag, bid, nof, page));

      const books = [{ user_id: 1 }];
      expect(gen.next(books).value)
        .toEqual(call(ure.selectedPostListUsers, [1]));
    });
  });


  describe('fetchBooksAndUsersByAuthorTagApi test', () => {
    it('should request books and users matching author tag id', () => {
      const bid = 1;
      const nof = 3;
      const page = 0;
      const gen = api.fetchBooksAndUsersByAuthorTagApi(bid, nof, page);
      expect(gen.next().value)
        .toEqual(call(bre.selectedBooksByAuthorTag, bid, nof, page));

      const books = [{ user_id: 1 }];
      expect(gen.next(books).value)
        .toEqual(call(ure.selectedPostListUsers, [1]));
    });
  });


  describe('fetchBooksByCollectionApi test', () => {
    it('should request books by collection id', () => {
      const cid = 1;
      const gen = api.fetchBooksByCollectionApi(cid);
      expect(gen.next().value)
        .toEqual(call(agent.Collection.fetchById, cid));

      const cln = {
        book_ids: [1, 2]
      };
      expect(gen.next(cln).value)
        .toEqual(call(bre.selectedBooksForCollection, cln.book_ids));
    });
  });


  describe('fetchBooksByUserApi test', () => {
    it('should request books by user id', () => {
      const uid = 1;
      const gen = api.fetchBooksByUserApi(uid);
      expect(gen.next().value)
        .toEqual(call(ure.selectedUser, uid));

      const user = {
        books: [1, 2]
      };
      expect(gen.next(user).value)
        .toEqual(call(bre.selectedBooksForUser, user.books));
    });
  });
});
