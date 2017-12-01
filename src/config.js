import { Dimensions } from 'react-native';

export const SEARCHBY_TAG = 'searchby_tag';
export const SEARCHBY_NAME = 'searchby_name';

export const selectType = {
  /* 뉴스피드 패치될 때 */
  FETCHED_FROM_NEWSFEED: 'selectType/fetched_from_newsfeed',
  /* 마이페이지 */
  SELECT_FROM_MYPAGE_CLICKED_IMAGE: 'selectType/select_from_mypage_clicked_image',
  SELECT_FROM_MYPAGE_CLICKED_NICKNAME: 'selectType/select_from_mypage_clicked_nickname',
  /* 유저페이지 */
  SELECT_FROM_OTHERPAGE_CLICKED_IMAGE: 'selectType/select_from_otherpage_clicked_image',
  SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK: 'selectType/select_from_otherpage_clicked_collection_book',
  /* 뉴스피드 */
  SELECT_FROM_NEWSFEED_CLICKED_IMAGE: 'selectType/select_from_newsfeed_clicked_image',
  SELECT_FROM_NEWSFEED_CLICKED_NICKNAME: 'selectType/select_from_newsfeed_clicked_nickname',
  /* 포스트 리스트 */
  SELECT_FROM_POSTLIST_CLICKED_NICKNAME: 'selectType/select_from_postlist_clicked_nickname',
  /* 북마크 - 책 */
  SELECT_FROM_BOOKMARK_CLICKED_IMAGE: 'selectType/select_from_bookmark_clicked_image',
  /* 북마크 - 컬렉션 */
  SELECT_FROM_COLLECTION_LIST_BUTTON: 'selectType/select_from_collection_list_button',
  SELECT_FROM_COLLECTION_ADD_BUTTON: 'selectType/select_from_collection_add_button',
  SELECT_FROM_COLLECTION_NEXT_BUTTON: 'selectType/select_from_collection_next_button',
  SELECT_FROM_COLLECTION_COMPLETE_BUTTON: 'selectType/select_from_collection_complete_button',
  SELECT_FROM_COLLECTION_DELETE_BUTTON: 'selectType/select_from_collection_delete_button',
  SELECT_FROM_COLLECTION_CARD: 'selectType/select_from_collection_card',
  /* 북마크 - 컬렉션 - 책 */
  SELECT_FROM_COLLECTION_BOOK_ADD_BUTTON: 'selectType/select_from_collection_book_add_button',
  SELECT_FROM_COLLECTION_BOOK_COMPLETE_BUTTON: 'selectType/select_from_collection_book_complete_button',
  /* 검색창 */
  SELECT_FROM_SEARCH_LIST: 'selectType/select_from_search_list'
};

export const headerType = {
  NONE: 'headerType/none',
  TAG: 'headerType/tag',
  TEXT: 'headerType/text'
};

export const headerTextType = {
  NONE: 'headerTextType/none',
  TITLE: 'headerTextType/title',
  AUTHOR: 'headerTextType/author',
  NICKNAME: 'headerTextType/nickname'
};

export const postTitleType = {
  TAG: 'postTitleType/tag',
  TEXT: 'postTitleType/text'
};

export const NUM_OF_FEEDS_PER_LOAD = 3;

export const USER_ID = 1;

export const NUM_OF_ROW = 3;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
