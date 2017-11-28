import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  FETCH_COLLECTION_REQUEST: 'collection/fetch_collection_request',
  FETCH_COLLECTION_READY: 'collection/fetch_collection_ready',
  FETCH_COLLECTION_SUCCESS: 'collection/fetch_collection_success',

  ADD_COLLECTION_REQUEST: 'collection/add_collection_request',
  ADD_COLLECTION_READY: 'collection/add_collection_ready',
  ADD_COLLECTION_SUCCESS: 'collection/add_collection_success',

  REMOVE_COLLECTION_REQUEST: 'collection/remove_collection_request',
  REMOVE_COLLECTION_READY: 'collection/remove_collection_ready',
  REMOVE_COLLECTION_SUCCESS: 'collection/remove_collection_success',

  ADD_BOOKS_TO_COLLECTION_REQUEST: 'collection/add_books_to_collection_request',
  ADD_BOOKS_TO_COLLECTION_READY: 'collection/add_books_to_collection_ready',
  ADD_BOOKS_TO_COLLECTION_SUCCESS: 'collection/add_books_to_collection_success'
};

export const initialState = {
  isCollectionFetched_: false,
  myCollections_: List().toJS(),
  isCollectionAdded_: false,
  isCollectionRemoved_: false,
  isCollectionLoading_: false,
  isBooksAreAddingToCollection_: false
};

export const fetch = {
  [types.FETCH_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isCollectionFetched_: false
    };
  },
  [types.FETCH_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isCollectionFetched_: true,
      myCollections_: List(action.payload).toJS() || []
    };
  }
};

export const add = {
  [types.ADD_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isCollectionAdded_: false
    };
  },
  [types.ADD_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isCollectionAdded_: true
    };
  }
};

export const remove = {
  [types.REMOVE_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isCollectionRemoved_: false
    };
  },
  [types.REMOVE_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isCollectionRemoved_: true
    };
  }
};

export const addBooks = {
  [types.ADD_BOOKS_TO_COLLECTION_READY]: (state, action) => {
    return {
      ...state,
      isBooksAreAddingToCollection_: false
    };
  },
  [types.ADD_BOOKS_TO_COLLECTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      isBooksAreAddingToCollection_: true
    };
  }
};

export default collection = createReducer(initialState, {
  ...fetch,
  ...add,
  ...remove,
  ...addBooks
});

export const selectors = {
  GetIsCollectionFetched: state => state.collection.isCollectionFetched_,
  GetMyCollections: state => state.collection.myCollections_,
  GetIsCollectionAdded: state => state.collection.isCollectionAdded_,
  GetIsCollectionRemoved: state => state.collection.isCollectionRemoved_,
  GetIsCollectionLoading: state => state.collection.isCollectionLoading_,
  GetIsBooksAreAddingToCollection: state => state.collection.isBooksAreAddingToCollection_
};
