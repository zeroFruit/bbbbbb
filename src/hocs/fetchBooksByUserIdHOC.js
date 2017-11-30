import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressBar from '../components/ProgressBar';
import { types } from '../ducks';
import { selectors } from '../ducks/book';

export const fetchBooksByUserIdHOC = (WrappedComponent) => {
  class WithBooks extends PureComponent {
    state = {
      isBooksForUserFetching: true
    };

    componentDidMount() {
      this._fetchBooksByUser(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isBooksForUserFetched_) {
        this._setStateIsBooksForUserFetching(false);
      }
    }

    render() {
      if (this.state.isBooksForUserFetching) {
        return <ProgressBar />;
      }
      const { selectedBooksForUser_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ selectedBooksForUser_ } />
      );
    }

    _setStateIsBooksForUserFetching = (state) => {
      this.setState({ isBooksForUserFetching: state });
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
    type: types.FETCH_BOOKS_BY_USER_REQUEST,
    payload: user
  })
}, dispatch);
