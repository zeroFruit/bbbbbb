import { List } from 'immutable';
import book, { types, initialState } from '../../src/ducks/book';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(book(undefined, {})).toEqual(initialState);
  });

  describe('reducer / fetchMyBooks', () => {
    describe('FETCH_MY_BOOKS - SUCCESS', () => {
      const myBookList = List([{ id: 1 }]).toJS();
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: myBookList
        })).toEqual({
          ...initialState,
          myBooks_: myBookList
        });
      });
    });
  });

  describe('reducer / fetchSelectedBook', () => {
    const selectedBook = { id: 1 };

    describe('FETCH_BOOK_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOK_READY
        })).toEqual({
          ...initialState,
          isBookFetched_: true
        });
      });
    });
    describe('FETCH_BOOK_SUCCESS', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOK_SUCCESS,
          payload: selectedBook
        })).toEqual({
          ...initialState,
          isBookFetched_: false,
          selectedBook_: selectedBook
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
    describe('FETCH_BOOKS_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_READY
        })).toEqual({
          ...initialState,
          isBooksFetched_: false
        });
      });
    });
    describe('FETCH_BOOKS_SUCCESS', () => {
      it('success - initial fetch', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...initialState,
          isBooksFetched_: true,
          selectedBooks_: List([selectedBooks[0]]).toJS()
        });
      });
      it('success - concat books', () => {
        expect(book({
          ...initialState,
          selectedBooks_: List([selectedBooks[0]]).toJS()
        }, {
          type: types.FETCH_BOOKS_SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...initialState,
          isBooksFetched_: true,
          selectedBooks_: List(selectedBooks).toJS()
        });
      });
    });
    describe('FETCH_BOOKS_UNMOUNT', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_UNMOUNT
        })).toEqual({
          ...initialState,
          selectedBooks_: List().toJS()
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
    describe('FETCH_BOOKS_BY_TAG_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_TAG_READY
        })).toEqual({
          ...initialState,
          isBooksByTagFetched_: false
        });
      });
    });
    describe('FETCH_BOOKS_BY_TAG_SUCCESS', () => {
      it('success - initial fetch', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_TAG_SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...initialState,
          isBooksByTagFetched_: true,
          selectedBooksByTag_: List([selectedBooks[0]]).toJS()
        });
      });
      it('success - concat books', () => {
        expect(book({
          ...initialState,
          selectedBooksByTag_: List([selectedBooks[0]]).toJS()
        }, {
          type: types.FETCH_BOOKS_BY_TAG_SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...initialState,
          isBooksByTagFetched_: true,
          selectedBooksByTag_: List(selectedBooks).toJS()
        });
      });
    });
    describe('FETCH_BOOKS_BY_TAG_UNMOUNT', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_TAG_UNMOUNT
        })).toEqual({
          ...initialState,
          selectedBooksByTag_: List().toJS()
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
    describe('FETCH_BOOKS_BY_AUTHOR_TAG_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG_READY
        })).toEqual({
          ...initialState,
          isBooksByAuthorTagFetched_: false
        });
      });
    });
    describe('FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS', () => {
      it('success - initial fetch', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS,
          payload: selectedBooks[0]
        })).toEqual({
          ...initialState,
          isBooksByAuthorTagFetched_: true,
          selectedBooksByAuthorTag_: List([selectedBooks[0]]).toJS()
        });
      });
      it('success - concat books', () => {
        expect(book({
          ...initialState,
          selectedBooksByAuthorTag_: List([selectedBooks[0]]).toJS()
        }, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS,
          payload: selectedBooks[1]
        })).toEqual({
          ...initialState,
          isBooksByAuthorTagFetched_: true,
          selectedBooksByAuthorTag_: List(selectedBooks).toJS()
        });
      });
    });
    describe('FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT
        })).toEqual({
          ...initialState,
          selectedBooksByAuthorTag_: List().toJS()
        });
      });
    });
  });

  describe('reducer / fetchBooksForCollection', () => {
    const selectedBooks = [{ id: 1 }, { id: 2 }];

    describe('FETCH_BOOKS_FOR_COLLECTION_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_FOR_COLLECTION_READY
        })).toEqual({
          ...initialState,
          isBooksForCollectionFetched_: false
        });
      });
    });
    describe('FETCH_BOOKS_FOR_COLLECTION_SUCCESS', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_FOR_COLLECTION_SUCCESS,
          payload: selectedBooks
        })).toEqual({
          ...initialState,
          isBooksForCollectionFetched_: true,
          selectedBooksForCollection_: List(selectedBooks).toJS()
        });
      });
    });
  });

  describe('reducer / fetchBooksByUser', () => {
    const selectedBooks = [{ id: 1 }, { id: 2 }];

    describe('FETCH_BOOKS_FOR_USER_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_FOR_USER_READY
        })).toEqual({
          ...initialState,
          isBooksForUserFetched_: false
        });
      });
    });
    describe('FETCH_BOOKS_FOR_USER_SUCCESS', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.FETCH_BOOKS_FOR_USER_SUCCESS,
          payload: selectedBooks
        })).toEqual({
          ...initialState,
          isBooksForUserFetched_: true,
          selectedBooksForUser_: List(selectedBooks).toJS()
        });
      });
    });
  });

  describe('reducer / add', () => {
    describe('ADD_BOOK_READY', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.ADD_BOOK_READY
        })).toEqual({
          ...initialState,
          isBookAdd_: false
        });
      });
    });
    describe('ADD_BOOK_SUCCESS', () => {
      it('success', () => {
        expect(book(initialState, {
          type: types.ADD_BOOK_SUCCESS
        })).toEqual({
          ...initialState,
          isBookAdd_: true
        });
      });
    });
  });

});
