import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';

export const withLoaderHOC = (WrappedComponent) => {
  return class WithLoader extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      if (!this.isBookAndUserFetched()) {
        return <View />;
      }
      return <WrappedComponent { ...this.props } />;
    }

    isBookAndUserFetched() {
      const { bookInfo, userInfo } = this.props;
      return (
        bookInfo !== undefined &&
        !_.isEmpty(bookInfo) &&
        userInfo !== undefined &&
        !_.isEmpty(userInfo)
      );
    }
  };
};
