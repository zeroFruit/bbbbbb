import { List } from 'immutable';
import {
  stateType,
  createType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  getStateFlag,
  getStatePayload
} from '../helper';

import SearchHistory from '../../utils/SearchHistory';

export const types = {
  FETCH_SEARCH_RESULT: createRequestTypes(['search', 'FETCH_SEARCH_RESULT']),
  INSERT_TO_RECENT_SEARCH_TEXT: createType(['search', 'INSERT_TO_RECENT_SEARCH_TEXT']),
};

export const initialState = {
  searchHistory_: new SearchHistory(),
  searchResults_: createInitState('SearchResults', 'Fetch', stateType.LIST)
};

const insert = {
  [types.INSERT_TO_RECENT_SEARCH_TEXT]: (state, action) => {
    return {
      ...state,
      searchHistory_: new SearchHistory().insertSearchText(action.payload)
    };
  }
};

const fetchResults = {
  [types.FETCH_SEARCH_RESULT.READY]: (state, action) => {
    return {
      ...state,
      searchResults_: setStateFlag(state.searchResults_, true)
    };
  },
  [types.FETCH_SEARCH_RESULT.SUCCESS]: (state, action) => {
    return {
      ...state,
      searchResults_: setStatePayload(
        setStateFlag(state.searchResults_, false),
        List(action.payload).toJS()
      )
    };
  }
};

export default search = createReducer(initialState, {
  ...insert,
  ...fetchResults
});

export const actions = {

};

export const selectors = {
  GetSearchHistory: state => state.search.searchHistory_.GetSearchHistory(),
  GetIsSearching: state => getStateFlag(state.search.searchResults_),
  GetSearchResults: state => getStatePayload(state.search.searchResults_)
};
