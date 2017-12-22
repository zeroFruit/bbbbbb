import {
  action,
  stateType,
  createReducer,
  createRequestTypes,
  createType,
  createInitState,
  setStateFlag,
  setStatePayload,
  getStateFlag,
  getStatePayload
} from '../helper';

export const types = {
  FETCH_TAG_BY_BID: createRequestTypes(['tag', 'FETCH_TAG_BY_BID']),
  FETCH_TAG_BY_TID: createRequestTypes(['tag', 'FETCH_TAG_BY_TID']),
  UNMOUNT_TAG: createType(['tag', 'UNMOUNT_TAG'])
};

export const initialState = {
  selectedTag_: createInitState('SelectedTag', 'Fetch', stateType.OBJ)
};

const fetchTagByBid = {
  [types.FETCH_TAG_BY_BID.READY]: (state, action) => ({
    ...state,
    selectedTag_: setStateFlag(state.selectedTag_, false)
  }),
  [types.FETCH_TAG_BY_BID.SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedTag_: setStatePayload(
        setStateFlag(state.selectedTag_, true), {
          title: action.payload.bookTitle,
          author: action.payload.bookAuthor
        })
    });
  }
};

const fetchTagByTid = {
  [types.FETCH_TAG_BY_TID.READY]: (state, action) => ({
    ...state,
    selectedTag_: setStateFlag(state.selectedTag_, false)
  }),
  [types.FETCH_TAG_BY_TID.SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedTag_: setStatePayload(
        setStateFlag(state.selectedTag_, true), {
          title: action.payload.bookTitle,
          author: action.payload.bookAuthor
        })
    });
  }
};

const unmountTag = {
  [types.UNMOUNT_TAG]: (state, action) => ({
    ...state,
    selectedTag_: initialState.selectedTag_
  })
};

export default tag = createReducer(initialState, {
  ...fetchTagByBid,
  ...fetchTagByTid,
  ...unmountTag
});

export const actions = {
  UnmountTag: () => action(types.UNMOUNT_TAG)
};

export const selectors = {
  GetSeletedBookTitleTag: state => getStatePayload(state.tag.selectedTag_).title,
  GetSelectedBookAuthorTag: state => getStatePayload(state.tag.selectedTag_).author,

  GetIsSelectedBookTagFetched: state => getStateFlag(state.tag.selectedTag_),
};
