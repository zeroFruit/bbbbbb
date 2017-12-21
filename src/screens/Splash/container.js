import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types } from '../../ducks/user';
import ComponentWithHOC from './index';

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchMyInfoRequestAction: (userId) => {
    return ({
      type: types.FETCH_ME.REQUEST,
      payload: userId
    });
  }
}, dispatch);

export default connect(null, mapDispatchToProps)(ComponentWithHOC);
