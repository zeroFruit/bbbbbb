import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book';
import { selectors as bookmarkSelectors } from '../../ducks/bookmark';
import { actions as tagActions } from '../../ducks/tag';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  myBooks_: bookSelectors.GetMyBooks(state),
  myBookmarks_: bookmarkSelectors.GetMyBookmarks(state),
  myBookmarksAndBooks_: selectors.BookAndBookmarkSelector(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  UpdatePageAction: bookActions.LoadNewsfeed
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
