import { List } from 'immutable';
import {
  stateType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  concatStatePayload,
  getStateFlagName,
  getStatePayloadName,
  getStateFlag,
  getStatePayload
} from './helper';


export const types = {
  FETCH_MY_BOOKS: createRequestTypes(['book', 'FETCH_MY_BOOKS']),
  FETCH_BOOK_READY: 'book/fetch_book_ready',
  FETCH_BOOK_REQUEST: 'book/fetch_book_request',
  FETCH_BOOK_SUCCESS: 'book/fetch_book_success',

  FETCH_BOOKS_READY: 'book/fetch_books_ready',
  FETCH_BOOKS_REQUEST: 'book/fetch_books_request',
  FETCH_BOOKS_SUCCESS: 'book/fetch_books_success',
  FETCH_BOOKS_UNMOUNT: 'book/fetch_books_unmount',

  FETCH_BOOKS_BY_TAG_REQUEST: 'book/fetch_books_by_tag_request',
  FETCH_BOOKS_BY_TAG_READY: 'book/fetch_books_by_tag_ready',
  FETCH_BOOKS_BY_TAG_SUCCESS: 'book/fetch_books_by_tag_success',
  FETCH_BOOKS_BY_TAG_UNMOUNT: 'book/fetch_books_by_tag_unmount',

  FETCH_BOOKS_BY_AUTHOR_TAG_REQUEST: 'book/fetch_books_by_author_tag_request',
  FETCH_BOOKS_BY_AUTHOR_TAG_READY: 'book/fetch_books_by_author_tag_ready',
  FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS: 'book/fetch_books_by_author_tag_success',
  FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT: 'book/fetch_books_by_author_tag_unmount',

  FETCH_BOOKS_FOR_COLLECTION_REQUEST: 'book/fetch_books_for_collection_request',
  FETCH_BOOKS_FOR_COLLECTION_READY: 'book/fetch_books_for_collection_ready',
  FETCH_BOOKS_FOR_COLLECTION_SUCCESS: 'book/fetch_books_for_collection_success',

  FETCH_BOOKS_FOR_USER_REQUEST: 'book/fetch_books_for_user_request',
  FETCH_BOOKS_FOR_USER_READY: 'book/fetch_books_for_user_ready',
  FETCH_BOOKS_FOR_USER_SUCCESS: 'book/fetch_books_for_user_success',

  ADD_BOOK_REQUEST: 'book/add_book_request',
  ADD_BOOK_READY: 'book/add_book_ready',
  ADD_BOOK_SUCCESS: 'book/add_book_success',

  UNMOUNT_BOOK: 'book/unmount_book'
};

export const initialState = {
  numOfFeedsPerLoad_: 3,
  myBooks_: createInitState('MyBooks', 'Fetch', stateType.LIST),
  isBookFetched_: false,
  selectedBook_: {},
  isBooksFetched_: false,
  selectedBooks_: List().toJS(),
  isBooksByTagFetched_: false,
  selectedBooksByTag_: List().toJS(),
  isBooksByAuthorTagFetched_: false,
  selectedBooksByAuthorTag_: List().toJS(),
  isBooksForCollectionFetched_: false,
  selectedBooksForCollection_: List().toJS(),
  isBooksForUserFetched_: false,
  selectedBooksForUser_: List().toJS(),
  isBookAdd_: false
};

const fetchMyBooks = {
  [types.FETCH_MY_BOOKS.SUCCESS]: (state, action) => ({
    ...state,
    myBooks_: setStatePayload(state.myBooks_, action.payload)
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
    });
  },
  [types.FETCH_BOOKS_UNMOUNT]: (state, action) => {
    return ({
      ...state,
      selectedBooks_: List().toJS()
    });
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

const fetchBooksByAuthorTag = {
  [types.FETCH_BOOKS_BY_AUTHOR_TAG_READY]: (state, action) => {
    return {
      ...state,
      isBooksByAuthorTagFetched_: false
    };
  },
  [types.FETCH_BOOKS_BY_AUTHOR_TAG_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksByAuthorTagFetched_: true,
      selectedBooksByAuthorTag_: List(state.selectedBooksByAuthorTag_).concat(action.payload).toJS()
    };
  },
  [types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT]: (state, action) => {
    return {
      ...state,
      selectedBooksByAuthorTag_: List().toJS()
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
  [types.FETCH_BOOKS_FOR_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      selectedBooksForCollection_: List(action.payload).toJS(),
      isBooksForCollectionFetched_: true
    };
  }
};

const fetchBooksByUser = {
  [types.FETCH_BOOKS_FOR_USER_READY]: (state, action) => {
    return {
      ...state,
      isBooksForUserFetched_: false
    };
  },
  [types.FETCH_BOOKS_FOR_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksForUserFetched_: true,
      selectedBooksForUser_: List(action.payload).toJS()
    };
  }
};

const add = {
  [types.ADD_BOOK_READY]: (state, action) => {
    return {
      ...state,
      isBookAdd_: false
    };
  },
  [types.ADD_BOOK_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookAdd_: true
    };
  }
};

export default book = createReducer(initialState, {
  ...fetchMyBooks,
  ...fetchSelectedBook,
  ...fetchBooks,
  ...fetchBooksByTag,
  ...fetchBooksByAuthorTag,
  ...fetchBooksForCollection,
  ...fetchBooksByUser,
  ...add
});

export const actions = {
  UnmountFetchedBooks: () => ({ type: types.FETCH_BOOKS_UNMOUNT }),
  UnmountFetchedBooksByTag: () => ({ type: types.FETCH_BOOKS_BY_TAG_UNMOUNT }),
  UnmountFetchedBooksByAuthorTag: () => ({ type: types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT })
};

export const selectors = {
  GetNumOfFeedsPerLoad: state => state.book.numOfFeedsPerLoad_,
  GetMyBooks: state => getStatePayload(state.book.myBooks_),
  GetIsBookFetched: state => state.book.isBookFetched_,
  GetSelectedBook: state => state.book.selectedBook_,
  GetIsBooksFetched: state => state.book.isBooksFetched_,
  GetSelectedBooks: state => state.book.selectedBooks_,
  GetIsBooksByTagFetched: state => state.book.isBooksByTagFetched_,
  GetSelectedBooksByTag: state => state.book.selectedBooksByTag_,
  GetIsBooksByAuthorTagFetched: state => state.book.isBooksByAuthorTagFetched_,
  GetSelectedBooksByAuthorTag: state => state.book.selectedBooksByAuthorTag_,
  GetIsBooksForCollectionFetched: state => state.book.isBooksForCollectionFetched_,
  GetSelectedBooksForCollection: state => state.book.selectedBooksForCollection_,
  GetIsBooksForUserFetched: state => state.book.isBooksForUserFetched_,
  GetSelectedBooksForUser: state => state.book.selectedBooksForUser_,
  GetIsBookAdd: state => state.book.isBookAdd_
};
