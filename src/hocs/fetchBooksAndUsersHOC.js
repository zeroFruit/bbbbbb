import React, { PureComponent } from 'react';
import agent from '../Agent';
import { concatArrays } from '../utils/ArrayUtils';

export const fetchBooksAndUsersHOC = (WrappedComponent) => {
  return class WithUsers extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      booksInfo: [],
      usersInfo: [],
    };

    async componentDidMount() {
      const { booksInfo, usersInfo } = await this._fetchBooksAndUsers();
      this._setBooksAndUsersToState(booksInfo, usersInfo);
      this.props.UpdatePageAction();
    }

    render() {
      const { booksInfo, usersInfo } = this.state;
      const { page_, numOfFeedsPerLoad_ } = this.props;

      return (
        <WrappedComponent
          booksInfo={ booksInfo }
          usersInfo={ usersInfo }
          page={ page_ }
          numOfFeedsPerLoad={ numOfFeedsPerLoad_ }
          requestBooksAndUsers={ this._requestBooksAndUsers }
          { ...this.props } />
      );
    }

    _requestBooksAndUsers = async () => {
      const { booksInfo, usersInfo } = await this._fetchBooksAndUsers();
      this._setBooksAndUsersToState(booksInfo, usersInfo);
      this.props.UpdatePageAction();
    }

    _fetchBooksAndUsers = async () => {
      const booksInfo = await this._fetchBooks();
      const usersInfo = await this._fetchUsers(booksInfo);

      return { booksInfo, usersInfo };
    }

    _fetchBooks = async () => {
      const { page_, numOfFeedsPerLoad_ } = this.props;
      const books = await agent.Book.fetch(numOfFeedsPerLoad_, page_);
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
  };
};
