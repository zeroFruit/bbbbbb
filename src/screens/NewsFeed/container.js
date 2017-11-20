import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as pageSelectors } from '../../ducks/page';
import ComponentWithHOC from './index';

const mapDispatchToProps = dispatch => bindActionCreators({
  ResetNewsfeedPage: pageSelectors.ResetNewsfeedPage
}, dispatch);

export default connect(null, mapDispatchToProps)(ComponentWithHOC);
