import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../ducks';
import { selectors as bookSelectors } from '../../ducks/book';
import { selectors as bookmarkSelectors } from '../../ducks/bookmark';
import { selectors as tagSelectors, types as tagTypes } from '../../ducks/tag';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  myBooks_: bookSelectors.GetMyBooks(state),
  myBookmarks_: bookmarkSelectors.GetMyBookmarks(state),
  myBookmarksAndBooks_: selectors.BookAndBookmarkSelector(state)
});

export default connect(mapStateToProps, null)(ComponentWithHOC);
