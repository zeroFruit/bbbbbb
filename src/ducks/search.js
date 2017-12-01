import { List } from 'immutable';
import { createReducer } from './helper';
import SearchHistory from '../utils/SearchHistory';

export const types = {
  INSERT_TO_RECENT_SEARCH_TEXT: 'search/insert_to_recent_search_text',

  FETCH_SEARCH_RESULT_REQUEST: 'search/fetch_search_result_request',
  FETCH_SEARCH_RESULT_READY: 'search/fetch_search_result_ready',
  FETCH_SEARCH_RESULT_SUCCESS: 'search/fetch_search_result_success'
};

export const initialState = {
  searchHistory_: new SearchHistory(),
  isSearching_: false,
  searchResults_: List().toJS()
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
  [types.FETCH_SEARCH_RESULT_READY]: (state, action) => {
    return {
      ...state,
      isSearching_: true,
    };
  },
  [types.FETCH_SEARCH_RESULT_SUCCESS]: (state, action) => {
    return {
      ...state,
      isSearching_: false,
      searchResults_: List(action.payload).toJS()
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
  GetIsSearching: state => state.search.isSearching_,
  GetSearchResults: state => state.search.searchResults_
};
