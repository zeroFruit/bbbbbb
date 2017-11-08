import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComponentWithHOC from './index';
import { actions, types } from '../../ducks/bookmarkReducer';

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    AddBookmarkRequestAction: actions.AddBookmarkRequest,
    RemoveBookmarkRequestAction: actions.RemoveBookmarkRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
