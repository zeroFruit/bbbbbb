import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import { types, initialState as is, reducer } from '../../src/ducks';

describe('reducer', () => {
  describe('reducer / fetchBookAndUser', () => {
    describe('FETCH_BOOK_AND_USER - READY', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOK_AND_USER.READY
        })).toEqual({
          ...is,
          isBookAndUserFetched_: {
            ...is.isBookAndUserFetched_,
            [helper.getStateFlagName(is.isBookAndUserFetched_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOK_AND_USER - SUCCESS', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOK_AND_USER.SUCCESS
        })).toEqual({
          ...is,
          isBookAndUserFetched_: {
            ...is.isBookAndUserFetched_,
            [helper.getStateFlagName(is.isBookAndUserFetched_)]: true
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksAndUsers', () => {
    describe('FETCH_BOOKS_AND_USERS - READY', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS.READY
        })).toEqual({
          ...is,
          isBooksAndUsersFetched_: {
            ...is.isBooksAndUsersFetched_,
            [helper.getStateFlagName(is.isBooksAndUsersFetched_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOKS_AND_USERS - SUCCESS', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS.SUCCESS
        })).toEqual({
          ...is,
          isBooksAndUsersFetched_: {
            ...is.isBooksAndUsersFetched_,
            [helper.getStateFlagName(is.isBooksAndUsersFetched_)]: true
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksAndUsersByTag', () => {
    describe('FETCH_BOOKS_AND_USERS_BY_TAG - READY', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.READY
        })).toEqual({
          ...is,
          isBooksAndUsersFetchedByTag_: {
            ...is.isBooksAndUsersFetchedByTag_,
            [helper.getStateFlagName(is.isBooksAndUsersFetchedByTag_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOKS_AND_USERS_BY_TAG - SUCCESS', () => {
      it('should fetch flag', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS
        })).toEqual({
          ...is,
          isBooksAndUsersFetchedByTag_: {
            ...is.isBooksAndUsersFetchedByTag_,
            [helper.getStateFlagName(is.isBooksAndUsersFetchedByTag_)]: true
          }
        });
      });
    });
  });

  describe('reducer / isBooksAndUsersFetchedByAuthorTag_', () => {
    describe('FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG - READY', () => {
      it('should fetch flag false', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY
        })).toEqual({
          ...is,
          isBooksAndUsersFetchedByAuthorTag_: {
            ...is.isBooksAndUsersFetchedByAuthorTag_,
            [helper.getStateFlagName(is.isBooksAndUsersFetchedByAuthorTag_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG - SUCCESS', () => {
      it('should fetch flag true', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS
        })).toEqual({
          ...is,
          isBooksAndUsersFetchedByAuthorTag_: {
            ...is.isBooksAndUsersFetchedByAuthorTag_,
            [helper.getStateFlagName(is.isBooksAndUsersFetchedByAuthorTag_)]: true
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksByCollection', () => {
    describe('FETCH_BOOKS_BY_COLLECTION - READY', () => {
      it('should fetch flag false', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_BY_COLLECTION.READY
        })).toEqual({
          ...is,
          isBooksFetchedByCollection_: {
            ...is.isBooksFetchedByCollection_,
            [helper.getStateFlagName(is.isBooksFetchedByCollection_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOKS_BY_COLLECTION - SUCCESS', () => {
      it('should fetch flag true', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_BY_COLLECTION.SUCCESS
        })).toEqual({
          ...is,
          isBooksFetchedByCollection_: {
            ...is.isBooksFetchedByCollection_,
            [helper.getStateFlagName(is.isBooksFetchedByCollection_)]: true
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksByUser', () => {
    describe('FETCH_BOOKS_BY_USER - READY', () => {
      it('should fetch flag false', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_BY_USER.READY
        })).toEqual({
          ...is,
          isBooksFetchedByUser_: {
            ...is.isBooksFetchedByUser_,
            [helper.getStateFlagName(is.isBooksFetchedByUser_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOKS_BY_USER - SUCCESS', () => {
      it('should fetch flag true', () => {
        expect(reducer(is, {
          type: types.FETCH_BOOKS_BY_USER.SUCCESS
        })).toEqual({
          ...is,
          isBooksFetchedByUser_: {
            ...is.isBooksFetchedByUser_,
            [helper.getStateFlagName(is.isBooksFetchedByUser_)]: true
          }
        });
      });
    });
  });
});
