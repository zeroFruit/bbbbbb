import { createReducer } from './helper';
import SearchHistory from '../utils/SearchHistory';

export const types = {
  INSERT_TO_RECENT_SEARCH_TEXT: 'search/insert_to_recent_search_text'
};

export const initialState = {
  searchHistory: new SearchHistory()
};

const insert = {
  [types.INSERT_TO_RECENT_SEARCH_TEXT]: (state, action) => {
    return {
      ...state,
      searchHistory: new SearchHistory().insertSearchText(action.payload)
    };
  }
};

export default search = createReducer(initialState, {
  ...insert
});

export const actions = {

};

export const selectors = {
  GetSearchHistory: state => state.search.searchHistory.GetSearchHistory()
};
