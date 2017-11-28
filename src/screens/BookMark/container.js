import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as collectionSelectors, types as collectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isCollectionRemoved_: collectionSelectors.GetIsCollectionRemoved(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncDeleteCollectionRequestAction: id => ({
    type: collectionTypes.REMOVE_COLLECTION_REQUEST,
    payload: id
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
