import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import book, { types, initialState as is } from '../../src/ducks/book';

describe('reducer', () => {
  xit('should return the initial state', () => {
    expect(book(undefined, {})).toEqual(is);
  });

  describe('reducer / fetchMyBooks', () => {
    describe('FETCH_MY_BOOKS - SUCCESS', () => {
      const myBookList = List([{ id: 1 }]).toJS();
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: myBookList
        })).toEqual({
          ...is,
          myBooks_: {
            ...is.myBooks_,
            [helper.getStatePayloadName(is.myBooks_)]: myBookList
          }
        });
      });
    });
  });

  describe('reducer / fetchSelectedBook', () => {
    const selectedBook = { id: 1 };

    describe('FETCH_BOOK - READY', () => {
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_BOOK.READY
        })).toEqual({
          ...is,
          selectedBook_: {
            ...is.selectedBook_,
            [helper.getStateFlagName(is.selectedBook_)]: true
          }
        });
      });
    });
    describe('FETCH_BOOK - SUCCESS', () => {
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_BOOK.SUCCESS,
          payload: selectedBook
        })).toEqual({
          ...is,
          selectedBook_: {
            ...is.selectedBook_,
            [helper.getStateFlagName(is.selectedBook_)]: false,
            [helper.getStatePayloadName(is.selectedBook_)]: selectedBook
          }
        });
      });
    });
  });

  describe('reducer / fetchBooks', () => {
    const selectedBooks = List([{
      id: 1
    }, {
      id: 2
    }]).toJS();
    describe('FETCH_BOOKS - READY', () => {
      it('should fetch flag', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS.READY
        })).toEqual({
          ...is,
          selectedBooks_: {
            ...is.selectedBooks_,
            [helper.getStateFlagName(is.selectedBooks_)]: false
          }
        });
      });
    });
    describe('FETCH_BOOKS - SUCCESS', () => {
      it('should fetch flag with payload', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS.SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...is,
          selectedBooks_: {
            ...is.selectedBooks_,
            [helper.getStateFlagName(is.selectedBooks_)]: true,
            [helper.getStatePayloadName(is.selectedBooks_)]: List([selectedBooks[0]]).toJS()
          }
        });
      });
      it('should fetch flag with concatenated payload', () => {
        expect(book({
          ...is,
          selectedBooks_: {
            ...is.selectedBooks_,
            [helper.getStatePayloadName(is.selectedBooks_)]: List([selectedBooks[0]]).toJS()
          }
        }, {
          type: types.FETCH_BOOKS.SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...is,
          selectedBooks_: {
            ...is.selectedBooks_,
            [helper.getStateFlagName(is.selectedBooks_)]: true,
            [helper.getStatePayloadName(is.selectedBooks_)]: List(selectedBooks).toJS()
          }
        });
      });
    });
    describe('FETCH_BOOKS_UNMOUNT', () => {
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_UNMOUNT
        })).toEqual({
          ...is,
          selectedBooks_: {
            ...is.selectedBooks_,
            [helper.getStatePayloadName(is.selectedBooks_)]: List().toJS()
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksByTag', () => {
    const selectedBooks = List([{
      id: 1
    }, {
      id: 2
    }]).toJS();
    describe('FETCH_BOOKS_BY_TAG - READY', () => {
      it('should fetch flag', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_TAG.READY
        })).toEqual({
          ...is,
          selectedBooksByTag_: {
            ...is.selectedBooksByTag_,
            [helper.getStateFlagName(is.selectedBooksByTag_)]: false
          }
        });
      });
    });
    describe('FETCH_BOOKS_BY_TAG - SUCCESS', () => {
      it('should fetch flag with payload', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_TAG.SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...is,
          selectedBooksByTag_: {
            ...is.selectedBooksByTag_,
            [helper.getStateFlagName(is.selectedBooksByTag_)]: true,
            [helper.getStatePayloadName(is.selectedBooksByTag_)]: List([selectedBooks[0]]).toJS()
          }
        });
      });
      it('should fetch flag with concatenated payload', () => {
        expect(book({
          ...is,
          selectedBooksByTag_: {
            ...is.selectedBooksByTag_,
            [helper.getStatePayloadName(is.selectedBooksByTag_)]: List([selectedBooks[0]]).toJS()
          }
        }, {
          type: types.FETCH_BOOKS_BY_TAG.SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...is,
          selectedBooksByTag_: {
            ...is.selectedBooksByTag_,
            [helper.getStateFlagName(is.selectedBooksByTag_)]: true,
            [helper.getStatePayloadName(is.selectedBooksByTag_)]: List(selectedBooks).toJS()
          }
        });
      });
    });
    describe('FETCH_BOOKS_BY_TAG_UNMOUNT', () => {
      it('should empty list when there is no items', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_TAG_UNMOUNT
        })).toEqual({
          ...is,
          selectedBooksByTag_: {
            ...is.selectedBooksByTag_,
            [helper.getStatePayloadName(is.selectedBooksByTag_)]: List().toJS()
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksByAuthorTag', () => {
    const selectedBooks = List([{
      id: 1
    }, {
      id: 2
    }]).toJS();
    describe('FETCH_BOOKS_BY_AUTHOR_TAG - READY', () => {
      it('should fetch flag', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.READY
        })).toEqual({
          ...is,
          selectedBooksByAuthorTag_: {
            ...is.selectedBooksByAuthorTag_,
            [helper.getStateFlagName(is.selectedBooksByAuthorTag_)]: false
          }
        });
      });
    });
    describe('FETCH_BOOKS_BY_AUTHOR_TAG - SUCCESS', () => {
      it('should fetch flag with payload', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...is,
          selectedBooksByAuthorTag_: {
            ...is.selectedBooksByAuthorTag_,
            [helper.getStateFlagName(is.selectedBooksByAuthorTag_)]: true,
            [helper.getStatePayloadName(is.selectedBooksByAuthorTag_)]: List([selectedBooks[0]]).toJS()
          }
        });
      });
      it('should fetch flag with concatenated payload', () => {
        expect(book({
          ...is,
          selectedBooksByAuthorTag_: {
            ...is.selectedBooksByAuthorTag_,
            [helper.getStatePayloadName(is.selectedBooksByAuthorTag_)]: List([selectedBooks[0]]).toJS()
          }
        }, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...is,
          selectedBooksByAuthorTag_: {
            ...is.selectedBooksByAuthorTag_,
            [helper.getStateFlagName(is.selectedBooksByAuthorTag_)]: true,
            [helper.getStatePayloadName(is.selectedBooksByAuthorTag_)]: List(selectedBooks).toJS()
          }
        });
      });
    });
    describe('FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT', () => {
      it('should empty list when there is no items', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT
        })).toEqual({
          ...is,
          selectedBooksByAuthorTag_: {
            ...is.selectedBooksByAuthorTag_,
            [helper.getStatePayloadName(is.selectedBooksByAuthorTag_)]: List().toJS()
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksForCollection', () => {
    const selectedBooks = [{ id: 1 }, { id: 2 }];

    describe('FETCH_BOOKS_FOR_COLLECTION - READY', () => {
      it('should fetch flag', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_FOR_COLLECTION.READY
        })).toEqual({
          ...is,
          selectedBooksForCollection_: {
            ...is.selectedBooksForCollection_,
            [helper.getStateFlagName(is.selectedBooksForCollection_)]: false
          }
        });
      });
    });
    describe('FETCH_BOOKS_FOR_COLLECTION - SUCCESS', () => {
      it('should fetch flag with payload', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS,
          payload: selectedBooks
        })).toEqual({
          ...is,
          selectedBooksForCollection_: {
            ...is.selectedBooksForCollection_,
            [helper.getStateFlagName(is.selectedBooksForCollection_)]: true,
            [helper.getStatePayloadName(is.selectedBooksForCollection_)]: List(selectedBooks).toJS()
          }
        });
      });
    });
  });

  describe('reducer / fetchBooksByUser', () => {
    const selectedBooks = [{ id: 1 }, { id: 2 }];

    describe('FETCH_BOOKS_FOR_USER - READY', () => {
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_FOR_USER.READY
        })).toEqual({
          ...is,
          selectedBooksForUser_: {
            ...is.selectedBooksForUser_,
            [helper.getStateFlagName(is.selectedBooksForUser_)]: false
          }
        });
      });
    });
    describe('FETCH_BOOKS_FOR_USER - SUCCESS', () => {
      it('success', () => {
        expect(book(is, {
          type: types.FETCH_BOOKS_FOR_USER.SUCCESS,
          payload: selectedBooks
        })).toEqual({
          ...is,
          selectedBooksForUser_: {
            ...is.selectedBooksForUser_,
            [helper.getStateFlagName(is.selectedBooksForUser_)]: true,
            [helper.getStatePayloadName(is.selectedBooksForUser_)]: List(selectedBooks).toJS()
          }
        });
      });
    });
  });

  describe('reducer / add', () => {
    describe('ADD_BOOK - READY', () => {
      it('success', () => {
        expect(book(is, {
          type: types.ADD_BOOK.READY
        })).toEqual({
          ...is,
          isBookAdd_: {
            ...is.isBookAdd_,
            [helper.getStateFlagName(is.isBookAdd_)]: false
          }
        });
      });
    });
    describe('ADD_BOOK - SUCCESS', () => {
      it('success', () => {
        expect(book(is, {
          type: types.ADD_BOOK.SUCCESS
        })).toEqual({
          ...is,
          isBookAdd_: {
            ...is.isBookAdd_,
            [helper.getStateFlagName(is.isBookAdd_)]: true
          }
        });
      });
    });
  });

});
