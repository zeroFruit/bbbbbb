import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, types } from '../../ducks/book';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isBookAdd_: selectors.GetIsBookAdd(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncAddBookAction: book => ({
    type: types.ADD_BOOK.REQUEST,
    payload: book
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
