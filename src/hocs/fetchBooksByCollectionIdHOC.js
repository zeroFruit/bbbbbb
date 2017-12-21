import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types } from '../ducks';
import { selectors } from '../ducks/book';

export const fetchBooksByCollectionIdHOC = (WrappedComponent) => {
  class WithBooks extends PureComponent {
    async componentDidMount() {
      await this._fetchBooksByCollection(this.props.id);
    }

    render() {
      const { selectedBooksForCollection_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksForCollection_ } />
      );
    }

    _fetchBooksByCollection = async (cid) => {
      await this.props.AsyncFetchBooksWithCollectionAction(cid);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooks);
};

const mapStateToProps = state => ({
  isBooksForCollectionFetched_: selectors.GetIsBooksForCollectionFetched(state),
  selectedBooksForCollection_: selectors.GetSelectedBooksForCollection(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksWithCollectionAction: cid => ({
    type: types.FETCH_BOOKS_BY_COLLECTION.REQUEST,
    payload: cid
  })
}, dispatch);
