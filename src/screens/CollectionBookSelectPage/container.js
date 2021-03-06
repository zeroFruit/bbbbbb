import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as CollectionSelectors, types as CollectionTypes } from '../../ducks/collection';
import ComponentWithHOC from './index';

const mapStateToProps = state => ({
  isBooksInCollectionAdded_: CollectionSelectors.GetIsBooksInCollectionAdded(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncAddBooksToCollectionRequestAction: (id, bookIds) => ({
    type: CollectionTypes.ADD_BOOKS_TO_COLLECTION.REQUEST,
    payload: { id, bookIds }
  })
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
