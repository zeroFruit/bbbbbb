import { combineReducers } from 'redux';
import book from './bookReducer';
import bookmark from './bookmarkReducer';

export default combineReducers({
  book,
  bookmark
});
