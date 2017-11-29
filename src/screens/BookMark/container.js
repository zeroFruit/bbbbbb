import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as collectionSelectors, types as collectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isCollectionRemoved_: collectionSelectors.GetIsCollectionRemoved(state),
  isCollectionBooksRemoved_: collectionSelectors.GetIsCollectionBooksRemoved(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncDeleteCollectionRequestAction: id => ({
    type: collectionTypes.REMOVE_COLLECTION_REQUEST,
    payload: id
  }),
  AsyncDeleteCollectionBookRequestAction: (id, bookIds) => ({
    type: collectionTypes.REMOVE_COLLECTION_BOOKS_REQUEST,
    payload: { id, bookIds }
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
