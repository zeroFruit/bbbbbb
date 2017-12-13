import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as CollectionSelectors, types as CollectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isCollectionAdded_: CollectionSelectors.GetIsCollectionAdded(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncAddCollectionRequestAction: (label, bookIds) => ({
    type: CollectionTypes.ADD_COLLECTION.REQUEST,
    payload: { label, bookIds }
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
