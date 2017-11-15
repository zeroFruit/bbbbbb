import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  FETCH_COLLECTION_REQUEST: 'collection/fetch_collection_request',
  FETCH_COLLECTION_READY: 'collection/fetch_collection_ready',
  FETCH_COLLECTION_SUCCESS: 'collection/fetch_collection_success'
};

export const initialState = {
  isCollectionFetched_: false,
  myCollections_: List().toJS()
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

export default collection = createReducer(initialState, {
  ...fetch
});

export const selectors = {
  GetIsCollectionFetched: state => state.collection.isCollectionFetched_,
  GetMyCollections: state => state.collection.myCollections_
};
