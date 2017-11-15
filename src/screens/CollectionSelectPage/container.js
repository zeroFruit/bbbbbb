import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types as CollectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncAddCollectionRequestAction: (label, bookIds) => ({
    type: CollectionTypes.ADD_COLLECTION_REQUEST,
    payload: { label, bookIds }
  })
}, dispatch);

export default connect(null, mapDispatchToProps)(ComponentWithHOC);
