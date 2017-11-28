import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  FETCH_MY_BOOKS_REQUEST: 'book/fetch_my_books_request',
  FETCH_MY_BOOKS_SUCCESS: 'book/fetch_my_books_success',

  FETCH_BOOK_READY: 'book/fetch_book_ready',
  FETCH_BOOK_REQUEST: 'book/fetch_book_request',
  FETCH_BOOK_SUCCESS: 'book/fetch_book_success',

  FETCH_BOOKS_READY: 'book/fetch_books_ready',
  FETCH_BOOKS_REQUEST: 'book/fetch_books_request',
  FETCH_BOOKS_SUCCESS: 'book/fetch_books_success',

  FETCH_BOOKS_BY_TAG_REQUEST: 'book/fetch_books_by_tag_request',
  FETCH_BOOKS_BY_TAG_READY: 'book/fetch_books_by_tag_ready',
  FETCH_BOOKS_BY_TAG_SUCCESS: 'book/fetch_books_by_tag_success',
  FETCH_BOOKS_BY_TAG_UNMOUNT: 'book/fetch_books_by_tag_unmount',

  FETCH_BOOKS_FOR_COLLECTION_REQUEST: 'book/fetch_books_for_collection_request',
  FETCH_BOOKS_FOR_COLLECTION_READY: 'book/fetch_books_for_collection_ready',
  FETCH_BOOKS_FOR_COLLECTION_FETCHING: 'book/fetch_books_for_collection_fetching',
  FETCH_BOOKS_FOR_COLLECTION_SUCCESS: 'book/fetch_books_for_collection_success',

  UNMOUNT_BOOK: 'book/unmount_book'
};

export const initialState = {
  page_: 0,
  numOfFeedsPerLoad_: 3,
  myBooks_: List().toJS(),
  isBookFetched_: false,
  selectedBook_: {},
  isBooksFetched_: false,
  selectedBooks_: List().toJS(),
  isBooksByTagFetched_: false,
  selectedBooksByTag_: List().toJS(),
  isBooksForCollectionFetched_: false,
  selectedBooksForCollection_: List().toJS()
};

const fetchMyBooks = {
  [types.FETCH_MY_BOOKS_SUCCESS]: (state, action) => ({
    ...state,
    myBooks_: List(action.payload).toJS()
  })
};

const fetchSelectedBook = {
  [types.FETCH_BOOK_READY]: (state, action) => ({
    ...state,
    isBookFetched_: true
  }),
  [types.FETCH_BOOK_SUCCESS]: (state, action) => ({
    ...state,
    isBookFetched_: false,
    selectedBook_: action.payload
  })
};

const fetchBooks = {
  [types.FETCH_BOOKS_READY]: (state, action) => ({
    ...state,
    isBooksFetched_: false
  }),
  [types.FETCH_BOOKS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isBooksFetched_: true,
      selectedBooks_: List(state.selectedBooks_).concat(action.payload).toJS()
    })
  }
};

const fetchBooksByTag = {
  [types.FETCH_BOOKS_BY_TAG_READY]: (state, action) => {
    return {
      ...state,
      isBooksByTagFetched_: false
    };
  },
  [types.FETCH_BOOKS_BY_TAG_SUCCESS]: (state, action) => {
    console.log('reducer book', action.payload);
    return {
      ...state,
      isBooksByTagFetched_: true,
      selectedBooksByTag_: List(state.selectedBooksByTag_).concat(action.payload).toJS()
    };
  },
  [types.FETCH_BOOKS_BY_TAG_UNMOUNT]: (state, action) => {
    return {
      ...state,
      selectedBooksByTag_: List().toJS()
    };
  }
};

const fetchBooksForCollection = {
  [types.FETCH_BOOKS_FOR_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isBooksForCollectionFetched_: false
    };
  },
  [types.FETCH_BOOKS_FOR_COLLECTION_FETCHING]: (state, action) => {
    return {
      ...state,
      selectedBooksForCollection_: List(action.payload).toJS()
    };
  },
  [types.FETCH_BOOKS_FOR_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksForCollectionFetched_: true
    };
  }
};

const unmountSeletedBook = {
  [types.UNMOUNT_BOOK]: (state, action) => ({
    ...state,
    selectedBook_: initialState.selectedBook_
  })
}

export default book = createReducer(initialState, {
  ...fetchMyBooks,
  ...fetchSelectedBook,
  ...fetchBooks,
  ...fetchBooksByTag,
  ...fetchBooksForCollection
});

export const actions = {
  UnmountFetchedBooksByTag: () => ({ type: types.FETCH_BOOKS_BY_TAG_UNMOUNT })
};

export const selectors = {
  GetPage: state => state.book.page_,
  GetNumOfFeedsPerLoad: state => state.book.numOfFeedsPerLoad_,
  GetMyBooks: state => state.book.myBooks_,
  GetIsBookFetched: state => state.book.isBookFetched_,
  GetSelectedBook: state => state.book.selectedBook_,
  GetIsBooksFetched: state => state.book.isBooksFetched_,
  GetSelectedBooks: state => state.book.selectedBooks_,
  GetIsBooksByTagFetched: state => state.book.isBooksByTagFetched_,
  GetSelectedBooksByTag: state => state.book.selectedBooksByTag_,
  GetIsBooksForCollectionFetched: state => state.book.isBooksForCollectionFetched_,
  GetSelectedBooksForCollection: state => state.book.selectedBooksForCollection_
};
