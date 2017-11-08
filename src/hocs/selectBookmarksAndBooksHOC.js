import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectors } from '../ducks';
import { USER_ID } from '../config';

const { arrayOf, number } = PropTypes;

export const selectBookmarksAndBooksHOC = (WrappedComponent) => {
  const propTypes = {
    myBookmarksAndBooks_: arrayOf(number)
  };
  const defaultProps = {
    myBookmarksAndBooks_: []
  };

  class WithSelectedBookmarksAndBooks extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { myBookmarksAndBooks_ } = this.props;
      return (
        <WrappedComponent
          bookmarksAndBooks={ myBookmarksAndBooks_ }
          { ...this.props } />
      );
    }
  }

  WithSelectedBookmarksAndBooks.propTypes = propTypes;
  WithSelectedBookmarksAndBooks.defaultProps = defaultProps;

  return connect(mapStateToProps, null)(WithSelectedBookmarksAndBooks);
};

const mapStateToProps = state => ({
  myBookmarksAndBooks_: selectors.BookAndBookmarkSelector(state)
});
