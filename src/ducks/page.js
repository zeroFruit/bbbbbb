import { createReducer } from './helper';

export const types = {
  NEXT_NEWSFEED_PAGE: 'page/next_newsfeed_page',
  RESET_NEWSFEED_PAGE: 'page/reset_newsfeed_page',

  NEXT_SELECTED_LIST_PAGE: 'page/next_selected_list_page',
  RESET_SELECTED_LIST_PAGE: 'page/reset_selected_list_page'
};

export const initialState = {
  numOfFeedsPerLoad_: 3,
  newsfeedPage_: 0,
  selectedListPage_: 0
};

const newsfeedPage = {
  [types.NEXT_NEWSFEED_PAGE]: (state, action) => ({
    ...state,
    newsfeedPage_: state.newsfeedPage_ + 1
  }),
  [types.RESET_NEWSFEED_PAGE]: (state, action) => ({
    ...state,
    newsfeedPage_: 0
  })
};

const selectedListPage = {
  [types.NEXT_SELECTED_LIST_PAGE]: (state, action) => ({
    ...state,
    selectedListPage_: state.selectedListPage_ + 1
  }),
  [types.RESET_SELECTED_LIST_PAGE]: (state, action) => ({
    ...state,
    selectedListPage_: 0
  })
};

export default page = createReducer(initialState, {
  ...newsfeedPage,
  ...selectedListPage
});

export const actions = {
  NextNewsfeedPage: () => ({
    type: types.NEXT_NEWSFEED_PAGE
  }),
  ResetNewsfeedPage: () => ({
    type: types.RESET_NEWSFEED_PAGE
  }),
  NextSelectedListPage: () => ({
    type: types.NEXT_SELECTED_LIST_PAGE
  }),
  ResetSelectedListPage: () => ({
    type: types.RESET_SELECTED_LIST_PAGE
  })
};

export const selectors = {
  GetNumOfFeedsPerLoad: state => state.page.numOfFeedsPerLoad_,
  GetNewsfeedPage: state => state.page.newsfeedPage_,
  GetSelectedListPage: state => state.page.selectedListPage_
}
