import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as CollectionSelectors, types as CollectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isCollectionRemoved_: CollectionSelectors.GetIsCollectionRemoved(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncDeleteCollectionRequestAction: id => ({
    type: CollectionTypes.REMOVE_COLLECTION_REQUEST,
    payload: id
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
