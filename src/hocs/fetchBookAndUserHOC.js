import React, { Component } from 'react';
import agent from '../Agent';

export const fetchBookAndUserHOC = (WrappedComponent) => {
  return class WithBookAndUser extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      bookInfo: {},
      userInfo: {}
    };

    async componentDidMount() {
      const { id, user } = this.props;
      const { userInfo, bookInfo } = await this._fetchBookAndUser(id, user);
      this._setStateBookAndUser(userInfo, bookInfo);
    }
    render() {
      const { bookInfo, userInfo } = this.state;
      return (
        <WrappedComponent userInfo={ userInfo } bookInfo={ bookInfo } { ...this.props } />
      );
    }

    _fetchBookAndUser = async(id, user) => {
      const bookInfo = await agent.Book.fetchByBookId(id);
      const userInfo = await agent.User.fetchByUserId(user);

      return { bookInfo, userInfo };
    }

    _setStateBookAndUser = (userInfo, bookInfo) => {
      this.setState({ bookInfo, userInfo });
    }
  };
};
