import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../ducks/user';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  me_: selectors.GetMe(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
