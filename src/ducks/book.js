import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  LOAD_NEWSFEED_REQUEST: 'book/load_newsfeed_request',
  RESET_NEWSFFED_STATE: 'book/reset_newsfeed_state',
  FETCH_MY_BOOKS_REQUEST: 'book/fetch_my_books_request',
  FETCH_MY_BOOKS_SUCCESS: 'book/fetch_my_books_success',

  FETCH_BOOK_READY: 'book/fetch_book_ready',
  FETCH_BOOK_REQUEST: 'book/fetch_book_request',
  FETCH_BOOK_SUCCESS: 'book/fetch_book_success',

  UNMOUNT_BOOK: 'book/unmount_book'
};

export const initialState = {
  page_: 0,
  numOfFeedsPerLoad_: 3,
  myBooks_: List().toJS(),
  isBookFetched_: false,
  selectedBook_: {}
};

const page = {
  [types.LOAD_NEWSFEED_REQUEST]: (state, action) => ({
    ...state,
    page_: state.page_ + 1
  }),
  [types.RESET_NEWSFFED_STATE]: (state, action) => ({
    ...state,
    page_: 0
  }),
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

const unmountSeletedBook = {
  [types.UNMOUNT_BOOK]: (state, action) => ({
    ...state,
    selectedBook_: initialState.selectedBook_
  })
}

export default book = createReducer(initialState, {
  ...page,
  ...fetchMyBooks,
  ...fetchSelectedBook
});

export const actions = {
  LoadNewsfeed: () => {
    return {
      type: types.LOAD_NEWSFEED_REQUEST
    };
  },
  ResetNewsfeed: () => {
    return {
      type: types.RESET_NEWSFFED_STATE
    };
  },
  UnmountSelectedBook: () => {
    return {
      type: types.UNMOUNT_BOOK
    };
  }
};

export const selectors = {
  GetPage: state => state.book.page_,
  GetNumOfFeedsPerLoad: state => state.book.numOfFeedsPerLoad_,
  GetMyBooks: state => state.book.myBooks_,
  GetSelectedBook: state => state.book.selectedBook_,
  GetIsBookFetched: state => state.book.isBookFetched_
};
