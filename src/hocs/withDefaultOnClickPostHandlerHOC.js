import React, { PureComponent } from 'react';
import logger from '../utils/LogUtils';

export const withDefaultOnClickPostHandlerHOC = WrappedComponent => {
  class WithDefaultOnClickHandler extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;
    
    render() {
      if (!this.props.onClickPost) {
        return (
          <WrappedComponent
            onClickPost={ () => { logger.warn('onClick handler not defined'); } }
            { ...this.props } />
        );
      }

      return <WrappedComponent { ...this.props } />;
    }
  }

  return WithDefaultOnClickHandler;
};
