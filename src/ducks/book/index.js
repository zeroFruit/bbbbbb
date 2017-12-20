import { List } from 'immutable';
import {
  action,
  stateType,
  createType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  concatStatePayload,
  getStateFlag,
  getStatePayload
} from '../helper';


export const types = {
  FETCH_BOOK: createRequestTypes(['book', 'FETCH_BOOK']),
  FETCH_BOOKS: createRequestTypes(['book', 'FETCH_BOOKS']),
  FETCH_BOOKS_BY_TAG: createRequestTypes(['book', 'FETCH_BOOKS_BY_TAG']),
  FETCH_BOOKS_BY_AUTHOR_TAG: createRequestTypes(['book', 'FETCH_BOOKS_BY_AUTHOR_TAG']),
  FETCH_BOOKS_FOR_COLLECTION: createRequestTypes(['book', 'FETCH_BOOKS_FOR_COLLECTION']),
  FETCH_BOOKS_FOR_USER: createRequestTypes(['book', 'FETCH_BOOKS_FOR_USER']),
  ADD_BOOK: createRequestTypes(['book', 'ADD_BOOK']),

  FETCH_BOOKS_UNMOUNT: createType(['book', 'FETCH_BOOKS_UNMOUNT']),
  FETCH_BOOKS_BY_TAG_UNMOUNT: createType(['book', 'FETCH_BOOKS_BY_TAG_UNMOUNT']),
  FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT: createType(['book', 'FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT']),
  _FETCH_BOOKS_FOR_COLLECTION: createType(['common', '_FETCH_BOOKS_FOR_COLLECTION']),
  _FETCH_MY_BOOKS: createType(['common', '_FETCH_MY_BOOKS']),
  _FETCH_SELECTED_BOOKS: createType(['common', '_FETCH_SELECTED_BOOKS'])
};

export const initialState = {
  myBooks_: createInitState('MyBooks', 'Fetch', stateType.LIST),
  selectedBook_: createInitState('SelectedBook', 'Fetch', stateType.OBJ),
  selectedBooks_: createInitState('SelectedBooks', 'Fetch', stateType.LIST),
  selectedBooksByTag_: createInitState('SelectedBooksByTag', 'Fetch', stateType.LIST),
  selectedBooksByAuthorTag_: createInitState('SelectedBooksByAuthorTag', 'Fetch', stateType.LIST),
  selectedBooksForCollection_: createInitState('SelectedBooksForCollection', 'Fetch', stateType.LIST),
  selectedBooksForUser_: createInitState('SelectedBooksForUser', 'Fetch', stateType.LIST),
  isBookAdd_: createInitState('Book', 'Add', stateType.NONE)
};

const fetchMyBooks = {
  [types._FETCH_MY_BOOKS]: (state, action) => ({
    ...state,
    myBooks_: setStatePayload(state.myBooks_, action.payload)
  })
};

const fetchSelectedBook = {
  [types.FETCH_BOOK.READY]: (state, action) => ({
    ...state,
    selectedBook_: setStateFlag(state.selectedBook_, true)
  }),
  [types.FETCH_BOOK.SUCCESS]: (state, action) => ({
    ...state,
    selectedBook_: setStatePayload(
      setStateFlag(state.selectedBook_, false),
      action.payload
    )
  })
};

const fetchBooks = {
  [types.FETCH_BOOKS.READY]: (state, action) => ({
    ...state,
    selectedBooks_: setStateFlag(state.selectedBooks_, false)
  }),
  [types.FETCH_BOOKS.SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedBooks_: concatStatePayload(
        setStateFlag(state.selectedBooks_, true),
        action.payload
      )
    });
  },
  [types._FETCH_SELECTED_BOOKS]: (state, action) => {
    return ({
      ...state,
      selectedBooks_: concatStatePayload(
        state.selectedBooks_,
        action.payload
      )
    })
  }
};

const unfetchBooks = {
  [types.FETCH_BOOKS_UNMOUNT]: (state, action) => ({
    ...state,
    selectedBooks_: setStatePayload(state.selectedBooks_, List().toJS())
  })
};

const fetchBooksByTag = {
  [types.FETCH_BOOKS_BY_TAG.READY]: (state, action) => {
    return {
      ...state,
      selectedBooksByTag_: setStateFlag(state.selectedBooksByTag_, false)
    };
  },
  [types.FETCH_BOOKS_BY_TAG.SUCCESS]: (state, action) => {
    return {
      ...state,
      selectedBooksByTag_: concatStatePayload(
        setStateFlag(state.selectedBooksByTag_, true),
        action.payload
      )
    };
  }
};

const unfetchBooksByTag = {
  [types.FETCH_BOOKS_BY_TAG_UNMOUNT]: (state, action) => ({
    ...state,
    selectedBooksByTag_: setStatePayload(
      state.selectedBooksByTag_,
      List().toJS()
    )
  })
};

const fetchBooksByAuthorTag = {
  [types.FETCH_BOOKS_BY_AUTHOR_TAG.READY]: (state, action) => {
    return {
      ...state,
      selectedBooksByAuthorTag_: setStateFlag(state.selectedBooksByAuthorTag_, false)
    };
  },
  [types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS]: (state, action) => {
    return {
      ...state,
      selectedBooksByAuthorTag_: concatStatePayload(
        setStateFlag(state.selectedBooksByAuthorTag_, true),
        action.payload
      )
    };
  }
};

const unfetchBooksByAuthorTag = {
  [types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT]: (state, action) => {
    return {
      ...state,
      selectedBooksByAuthorTag_: setStatePayload(
        state.selectedBooksByAuthorTag_,
        List().toJS()
      )
    };
  }
};

const fetchBooksForCollection = {
  [types.FETCH_BOOKS_FOR_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      selectedBooksForCollection_: setStateFlag(state.selectedBooksForCollection_, false)
    };
  },
  [types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      selectedBooksForCollection_: setStatePayload(
        setStateFlag(state.selectedBooksForCollection_, true),
        action.payload
      )
    };
  },
  [types._FETCH_BOOKS_FOR_COLLECTION]: (state, action) => {
    return {
      ...state,
      selectedBooksForCollection: setStatePayload(
        state.selectedBooksForCollection_,
        action.payload
      )
    }
  }
};

const fetchBooksByUser = {
  [types.FETCH_BOOKS_FOR_USER.READY]: (state, action) => {
    return {
      ...state,
      selectedBooksForUser_: setStateFlag(state.selectedBooksForUser_, false)
    };
  },
  [types.FETCH_BOOKS_FOR_USER.SUCCESS]: (state, action) => {
    return {
      ...state,
      selectedBooksForUser_: setStatePayload(
        setStateFlag(state.selectedBooksForUser_, true),
        action.payload
      )
    };
  }
};

const add = {
  [types.ADD_BOOK.READY]: (state, action) => {
    return {
      ...state,
      isBookAdd_: setStateFlag(state.isBookAdd_, false)
    };
  },
  [types.ADD_BOOK.SUCCESS]: (state, action) => {
    return {
      ...state,
      isBookAdd_: setStateFlag(state.isBookAdd_, true)
    };
  }
};

export default book = createReducer(initialState, {
  ...fetchMyBooks,
  ...fetchSelectedBook,
  ...fetchBooks,
  ...unfetchBooks,
  ...fetchBooksByTag,
  ...unfetchBooksByTag,
  ...fetchBooksByAuthorTag,
  ...unfetchBooksByAuthorTag,
  ...fetchBooksForCollection,
  ...fetchBooksByUser,
  ...add
});

export const actions = {
  UnmountFetchedBooks: () => action(types.FETCH_BOOKS_UNMOUNT),
  UnmountFetchedBooksByTag: () => action(types.FETCH_BOOKS_BY_TAG_UNMOUNT),
  UnmountFetchedBooksByAuthorTag: () => action(types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT)
};

export const selectors = {
  GetMyBooks:                     state => getStatePayload(state.book.myBooks_),
  GetSelectedBook:                state => getStatePayload(state.book.selectedBook_),
  GetSelectedBooks:               state => getStatePayload(state.book.selectedBooks_),
  GetSelectedBooksByTag:          state => getStatePayload(state.book.selectedBooksByTag_),
  GetSelectedBooksByAuthorTag:    state => getStatePayload(state.book.selectedBooksByAuthorTag_),
  GetSelectedBooksForCollection:  state => getStatePayload(state.book.selectedBooksForCollection_),
  GetSelectedBooksForUser:        state => getStatePayload(state.book.selectedBooksForUser_),

  GetIsBookFetched:               state => getStateFlag(state.book.selectedBook_),
  GetIsBooksFetched:              state => getStateFlag(state.book.selectedBooks_),
  GetIsBooksByTagFetched:         state => getStateFlag(state.book.selectedBooksByTag_),
  GetIsBooksByAuthorTagFetched:   state => getStateFlag(state.book.selectedBooksByAuthorTag_),
  GetIsBooksForCollectionFetched: state => getStateFlag(state.book.selectedBooksForCollection_),
  GetIsBooksForUserFetched:       state => getStateFlag(state.book.selectedBooksForUser_),
  GetIsBookAdd:                   state => getStateFlag(state.book.isBookAdd_)
};
