import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  FETCH_COLLECTION_REQUEST: 'collection/fetch_collection_request',
  FETCH_COLLECTION_READY: 'collection/fetch_collection_ready',
  FETCH_COLLECTION_SUCCESS: 'collection/fetch_collection_success',

  ADD_COLLECTION_REQUEST: 'collection/add_collection_request',
  ADD_COLLECTION_READY: 'collection/add_collection_ready',
  ADD_COLLECTION_SUCCESS: 'collection/add_collection_success',
};

export const initialState = {
  isCollectionFetched_: false,
  myCollections_: List().toJS(),
  isCollectionAdded_: false
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
      myCollections_: List(action.payload).toJS()
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

export default collection = createReducer(initialState, {
  ...fetch,
  ...add
});

export const selectors = {
  GetIsCollectionFetched: state => state.collection.isCollectionFetched_,
  GetMyCollections: state => state.collection.myCollections_
};
