import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import agent from '../Agent';
import { MapperBook } from '../sagas/helper';

export const fetchBookByBookIdHOC = (WrappedComponent) => {
  class WithBook extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;
    state = {
      bookInfo: {}
    };

    async componentDidMount() {
      const { bookId } = this.props;
      /*
        TODO: Agent is used, should be moved
      */
      const bookInfo = await agent.Book.__fetchByBookId(bookId);
      this._setStateBookInfo(MapperBook(bookInfo));
    }

    render() {
      return (
        <WrappedComponent
          { ...this.props }
          bookInfo={ this.state.bookInfo } />
      );
    }

    _setStateBookInfo = (bookInfo) => {
      this.setState({ bookInfo });
    }
  }

  return WithBook;
};
