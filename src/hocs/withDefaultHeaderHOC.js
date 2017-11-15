import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { headerType as HeaderType } from '../config';

export const withDefaultHeaderHOC = (WrappedComponent) => {
  return class WithDefaultHeader extends PureComponent {
    render() {
      const { headerTitleProps } = this.props;

      if (!headerTitleProps || headerTitleProps === HeaderType.NONE) {
        return <View />;
      }

      return <WrappedComponent { ...this.props } />
    }
  }
}
