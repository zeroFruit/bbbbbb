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
  FETCH_COLLECTION: createRequestTypes(['collection', 'FETCH_COLLECTION']),
  ADD_COLLECTION: createRequestTypes(['collection', 'ADD_COLLECTION']),
  REMOVE_COLLECTION: createRequestTypes(['collection', 'REMOVE_COLLECTION']),
  ADD_BOOKS_TO_COLLECTION: createRequestTypes(['collection', 'ADD_BOOKS_TO_COLLECTION']),
  REMOVE_COLLECTION_BOOKS: createRequestTypes(['collection', 'REMOVE_COLLECTION_BOOKS']),
  FETCH_OTHER_USER_COLLECTION: createRequestTypes(['collection', 'FETCH_OTHER_USER_COLLECTION'])
};

export const initialState = {
  myCollections_: createInitState('MyCollections', 'Fetch', stateType.LIST),
  isCollectionAdded_: createInitState('Collection', 'Add', stateType.NONE),
  isCollectionRemoved_: createInitState('Collection', 'Remove', stateType.NONE),
  isBooksInCollectionAdded_: createInitState('BooksInCollection', 'Add', stateType.NONE),
  isBooksInCollectionRemoved_: createInitState('BooksInCollection', 'Remove', stateType.NONE),
  otherUserCollections_: createInitState('OtherUserCollections', 'Fetch', stateType.LIST)
};

export const fetch = {
  [types.FETCH_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      myCollections_: setStateFlag(state.myCollections_, false)
    };
  },
  [types.FETCH_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      myCollections_: setStatePayload(
        setStateFlag(state.myCollections_, true),
        action.payload || []
      )
    };
  }
};

export const add = {
  [types.ADD_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      isCollectionAdded_: setStateFlag(state.isCollectionAdded_, false)
    };
  },
  [types.ADD_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      isCollectionAdded_: setStateFlag(state.isCollectionAdded_, true)
    };
  }
};

export const remove = {
  [types.REMOVE_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      isCollectionRemoved_: setStateFlag(state.isCollectionRemoved_, false)
    };
  },
  [types.REMOVE_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      isCollectionRemoved_: setStateFlag(state.isCollectionRemoved_, true)
    };
  }
};

export const addBooks = {
  [types.ADD_BOOKS_TO_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      isBooksInCollectionAdded_: setStateFlag(state.isBooksInCollectionAdded_, false)
    };
  },
  [types.ADD_BOOKS_TO_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksInCollectionAdded_: setStateFlag(state.isBooksInCollectionAdded_, true)
    };
  }
};

export const removeBooks = {
  [types.REMOVE_COLLECTION_BOOKS.READY]: (state, action) => {
    return {
      ...state,
      isBooksInCollectionRemoved_: setStateFlag(state.isBooksInCollectionRemoved_, false)
    };
  },
  [types.REMOVE_COLLECTION_BOOKS.SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksInCollectionRemoved_: setStateFlag(state.isBooksInCollectionRemoved_, true)
    };
  }
};

export const fetchOtherUser = {
  [types.FETCH_OTHER_USER_COLLECTION.READY]: (state, action) => {
    return {
      ...state,
      otherUserCollections_: setStateFlag(state.otherUserCollections_, false)
    };
  },
  [types.FETCH_OTHER_USER_COLLECTION.SUCCESS]: (state, action) => {
    return {
      ...state,
      otherUserCollections_: setStatePayload(
        setStateFlag(state.otherUserCollections_, true),
        action.payload
      )
    };
  }
};

export default collection = createReducer(initialState, {
  ...fetch,
  ...add,
  ...remove,
  ...addBooks,
  ...removeBooks,
  ...fetchOtherUser
});

export const selectors = {
  GetMyCollections:                 state => getStatePayload(state.collection.myCollections_),
  GetOtherUserCollections:          state => getStatePayload(state.collection.otherUserCollections_),

  GetIsCollectionFetched:           state => getStateFlag(state.collection.myCollections_),
  GetIsCollectionAdded:             state => getStateFlag(state.collection.isCollectionAdded_),
  GetIsCollectionRemoved:           state => getStateFlag(state.collection.isCollectionRemoved_),
  GetIsBooksInCollectionAdded:      state => getStateFlag(state.collection.isBooksInCollectionAdded_),
  GetIsCollectionBooksRemoved:      state => getStateFlag(state.collection.isBooksInCollectionRemoved_),
  GetIsOtherUserCollectionsFetched: state => getStateFlag(state.collection.otherUserCollections_),
};
