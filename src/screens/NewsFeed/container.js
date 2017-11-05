import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComponentWithHOC from './index';
import { actions as bookActions, types as bookTypes } from '../../reducers/bookReducer';
import { actions as bookmarkActions, types as bookmarkTypes } from '../../reducers/bookmarkReducer';

const mapStateToProps = state => {
  return {
    ...state.book,
    ...state.bookmark
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    // TODO: 나중에 api request를 action으로 이동
    UpdatePageAction: bookActions.LoadNewsfeed,
    AddBookmarkSuccessAction: bookmarkActions.AddBookmarkSuccess
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
