import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressBar from '../components/ProgressBar';
import { types } from '../ducks';
import { selectors } from '../ducks/book';

export const fetchBooksByUserIdHOC = (WrappedComponent) => {
  class WithBooks extends PureComponent {
    componentDidMount() {
      this._fetchBooksByUser(this.props.id);
    }

    render() {
      const { selectedBooksForUser_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksForUser_ } />
      );
    }

    _fetchBooksByUser = (userId) => {
      this.props.AsyncFetchBooksWithUserAction(userId);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooks);
};

const mapStateToProps = state => ({
  isBooksForUserFetched_: selectors.GetIsBooksForUserFetched(state),
  selectedBooksForUser_: selectors.GetSelectedBooksForUser(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchBooksWithUserAction: user => ({
    type: types.FETCH_BOOKS_BY_USER.REQUEST,
    payload: user
  })
}, dispatch);
