import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import agent from '../Agent';

export const fetchBookByBookIdHOC = (WrappedComponent) => {
  class WithBook extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;
    state = {
      bookInfo: {}
    };

    async componentDidMount() {
      const { bookId } = this.props;
      const bookInfo = await agent.Book.fetchByBookId(bookId);
      this._setStateBookInfo(bookInfo);
    }

    render() {
      return (
        <WrappedComponent
          bookInfo={ this.state.bookInfo }
          { ...this.props } />
      );
    }

    _setStateBookInfo = (bookInfo) => {
      this.setState({ bookInfo });
    }
  }

  return WithBook;
};
