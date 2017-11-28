import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as CollectionSelectors, types as CollectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isCollectionRemoved_: CollectionSelectors.GetIsCollectionRemoved(state),
  isCollectionLoading_: CollectionSelectors.GetIsCollectionLoading(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncDeleteCollectionRequestAction: id => ({
    type: CollectionTypes.REMOVE_COLLECTION_REQUEST,
    payload: id
  }),
  LoadCollectionReadyAction: () => ({ type: CollectionTypes.LOAD_COLLECTION_READY }),
  LoadCollectionSuccessAction: () => ({ type: CollectionTypes.LOAD_COLLECTION_SUCCESS })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
