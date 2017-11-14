import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import agent from '../Agent';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';
import { selectors as tagSelectors, types as tagTypes } from '../ducks/tag';
import { concatArrays } from '../utils/ArrayUtils';

export const fetchBooksAndUsersByTagHOC = (WrappedComponent) => {
  class WithBooksAndUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      booksInfo: [],
      usersInfo: [],
    };

    async componentWillReceiveProps(nextProps) {
      const { isSelectedBookTagFetched_, id, page_, numOfFeedsPerLoad_ } = nextProps;
      if (isSelectedBookTagFetched_) {
        const { title_tag_id, author_tag_id } = await this._fetchSelectedBook(id);
        const { booksInfo, usersInfo } = await this._fetchBooksAndUsers(
          numOfFeedsPerLoad_,
          page_,
          title_tag_id,
          author_tag_id
        );
        this._setBooksAndUsersToState(booksInfo, usersInfo);
        // this.props.UpdatePageAction();
      }
    }

    render() {
      const { booksInfo, usersInfo } = this.state;
      const { page_, numOfFeedsPerLoad_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          page={ page_ }
          numOfFeedsPerLoad={ numOfFeedsPerLoad_ }
          requestBooksAndUsers={ this._requestBooksAndUsers } />
      );
    }

    _requestBooksAndUsers = async () => {
      const { booksInfo, usersInfo } = await this._fetchBooksAndUsers();
      this._setBooksAndUsersToState(booksInfo, usersInfo);
      // this.props.UpdatePageAction();
      console.log('_requestBooksAndUsers');
    }

    _fetchBooksAndUsers = async (numOfFeedsPerLoad, page, titleTagId, authorTagId) => {
      const booksInfo = await this._fetchBooks(numOfFeedsPerLoad, page, titleTagId, authorTagId);
      const usersInfo = await this._fetchUsers(booksInfo);
      return { booksInfo, usersInfo };
    }

    _fetchSelectedBook = async (bookId) => {
      const book = await agent.Book.fetchByBookId(bookId);
      return book;
    }

    _fetchBooks = async (numOfFeedsPerLoad, page, titleTagId, authorTagId) => {
      const books = await agent.Book.fetchByTag(numOfFeedsPerLoad, page, titleTagId, authorTagId);
      return books;
    }

    _fetchUsers = async (booksInfo) => {
      const promises = booksInfo.map(({ user_id }) => {
        return agent.User.fetchByUserId(user_id);
      });
      const usersInfo = await Promise.all(promises);
      return usersInfo;
    };

    _setBooksAndUsersToState = (booksInfo, usersInfo) => {
      const updatedBooksInfo = concatArrays(this.state.booksInfo, booksInfo);
      const updatedUsersInfo = concatArrays(this.state.usersInfo, usersInfo);
      this.setState({
        booksInfo: updatedBooksInfo,
        usersInfo: updatedUsersInfo
      });
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsers);
};

const mapStateToProps = state => ({
  ...state.tag
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ResetPageAction: bookActions.ResetNewsfeed
}, dispatch);
