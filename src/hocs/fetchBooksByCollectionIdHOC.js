import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressBar from '../components/ProgressBar';
import { types } from '../ducks';
import { selectors } from '../ducks/book';

export const fetchBooksByCollectionIdHOC = (WrappedComponent) => {
  class WithBooks extends PureComponent {
    state = {
      isBooksForCollectionFetching: false
    };

    async componentDidMount() {
      await this._fetchBooksByCollection(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isBooksForCollectionFetched_) {
        this._setStateIsBooksForCollectionFetching(false);
      }
    }

    render() {
      if (this.state.isBooksForCollectionFetching) {
        return <ProgressBar />;
      }
      const { selectedBooksForCollection_ } = this.props;

      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksForCollection_ } />
      );
    }

    _isCollectionIdFetched = id => id !== -1

    _setStateIsBooksForCollectionFetching = (state) => {
      this.setState({ isBooksForCollectionFetching: state });
    }

    _fetchBooksByCollection = async (collectionId) => {
      await this.props.AsyncFetchBooksWithCollectionAction(collectionId);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooks);
};

const mapStateToProps = state => ({
  isBooksForCollectionFetched_: selectors.GetIsBooksForCollectionFetched(state),
  selectedBooksForCollection_: selectors.GetSelectedBooksForCollection(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksWithCollectionAction: collection => ({
    type: types.FETCH_BOOKS_BY_COLLECTION.REQUEST,
    payload: collection
  })
}, dispatch);
