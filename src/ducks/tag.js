import { createReducer } from './helper';

export const types = {
  FETCH_BOOK_TAG_INIT: 'tag/fetch_book_tag_init',
  FETCH_BOOK_TAG_REQUEST: 'tag/fetch_book_tag_request',
  FETCH_BOOK_TAG_READY: 'tag/fetch_book_tag_ready',
  FETCH_BOOK_TAG_FETCHING: 'tag/fetch_book_tag_fetching',
  FETCH_BOOK_TAG_SUCCESS: 'tag/fetch_book_tag_success'
};

export const initialState = {
  isSelectedBookTagFetched_: false,
  selectedBookTitleTag_: '',
  selectedBookAuthorTag_: ''
};

const fetchSelectedBook = {
  // TODO: 태그를 패치 받고 싶은 곳에서 다음 타입 액션을 실행하기
  [types.FETCH_BOOK_TAG_INIT]: (state, action) => ({
    ...state,
    isSelectedBookTagFetched_: false
  }),
  [types.FETCH_BOOK_TAG_READY]: (state, action) => ({
    ...state,
    isSelectedBookTagFetched_: false
  }),
  [types.FETCH_BOOK_TAG_FETCHING]: (state, action) => {
    return ({
      ...state,
      selectedBookTitleTag_: action.payload.bookTitle,
      selectedBookAuthorTag_: action.payload.bookAuthor
    });
  },
  [types.FETCH_BOOK_TAG_SUCCESS]: (state, action) => {
    return ({
      ...state,
      isSelectedBookTagFetched_: true
    });
  }
};

export default tag = createReducer(initialState, {
  ...fetchSelectedBook
});

export const actions = {
  // TODO: 태그를 패치 받고 싶은 곳에서 다음 타입 액션을 실행하기
  FetchBookTagInit: () => ({
    type: types.FETCH_BOOK_TAG_INIT
  })
};

export const selectors = {
  GetIsSelectedBookTagFetched: state => state.tag.isSelectedBookTagFetched_,
  GetSeletedBookTitleTag: state => state.tag.selectedBookTitleTag_,
  GetSelectedBookAuthorTag: state => state.tag.selectedBookAuthorTag_
};
