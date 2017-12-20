import {
  action,
  createType,
  createReducer
} from '../helper';

export const types = {
  NEXT_NEWSFEED_PAGE: createType(['page', 'NEXT_NEWSFEED_PAGE']),
  RESET_NEWSFEED_PAGE: createType(['page', 'RESET_NEWSFEED_PAGE']),

  NEXT_SELECTED_LIST_PAGE: createType(['page', 'NEXT_SELECTED_LIST_PAGE']),
  RESET_SELECTED_LIST_PAGE: createType(['page', 'RESET_SELECTED_LIST_PAGE'])
};

export const initialState = {
  numOfFeedsPerLoad_: 3,
  newsfeedPage_: 0,
  selectedListPage_: 0
};

const newsfeedPage = {
  [types.NEXT_NEWSFEED_PAGE]: (state, action) => {
    return ({
      ...state,
      newsfeedPage_: state.newsfeedPage_ + 1
    });
  },
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
  NextNewsfeedPage: () => action(types.NEXT_NEWSFEED_PAGE),
  ResetNewsfeedPage: () => action(types.RESET_NEWSFEED_PAGE),
  NextSelectedListPage: () => action(types.NEXT_SELECTED_LIST_PAGE),
  ResetSelectedListPage: () => action(types.RESET_SELECTED_LIST_PAGE)
};

export const selectors = {
  GetNumOfFeedsPerLoad: state => state.page.numOfFeedsPerLoad_,
  GetNewsfeedPage: state => state.page.newsfeedPage_,
  GetSelectedListPage: state => state.page.selectedListPage_
};
