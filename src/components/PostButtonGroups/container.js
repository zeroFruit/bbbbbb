import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComponentWithHOC from './index';
import { actions, types } from '../../ducks/bookmark';

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncAddBookmarkRequestAction: bookId => ({
    type: types.ADD_BOOKMARK.REQUEST,
    payload: bookId
  }),
  AsyncRemoveBookmarkRequestAction: bookId => ({
    type: types.REMOVE_BOOKMARK.REQUEST,
    payload: bookId
  })
}, dispatch);

export default connect(null, mapDispatchToProps)(ComponentWithHOC);
