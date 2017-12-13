import {
  stateType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  getStateFlag,
  getStatePayload
} from './helper';

export const types = {
  FETCH_BOOK_TAG: createRequestTypes(['tag', 'FETCH_BOOK_TAG'])
};

export const initialState = {
  selectedTag_: createInitState('SelectedTag', 'Fetch', stateType.OBJ)
};

const fetchSelectedBook = {
  [types.FETCH_BOOK_TAG.READY]: (state, action) => ({
    ...state,
    selectedTag_: setStateFlag(state.selectedTag_, false)
  }),
  [types.FETCH_BOOK_TAG.SUCCESS]: (state, action) => {
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

export default tag = createReducer(initialState, {
  ...fetchSelectedBook
});

export const actions = {

};

export const selectors = {
  GetSeletedBookTitleTag: state => getStatePayload(state.tag.selectedTag_).title,
  GetSelectedBookAuthorTag: state => getStatePayload(state.tag.selectedTag_).author,
  
  GetIsSelectedBookTagFetched: state => getStateFlag(state.tag.selectedTag_),
};
