import React, { Component } from 'react';

export const mapNavigateParamsToProps = (WrappedComponent) => {
  return class MappedComponent extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { navigation } = this.props;
      const { state: { params } } = navigation;
      return <WrappedComponent { ...this.props } { ...params } />;
    }
  };
};
