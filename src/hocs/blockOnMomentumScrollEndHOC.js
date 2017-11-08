import React, { Component } from 'react';

export const blockOnMomentumScrollEndHOC = WrappedComponent => {
  return class WithBlockedHandler extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;
    
    render() {
      return (
        <WrappedComponent
          onMomentumScrollEnd={ this._onMomentumScrollEnd }
          { ...this.props } />
      );
    }

    _onMomentumScrollEnd = () => {
      const { booksInfo, page, numOfFeedsPerLoad } = this.props;
      if (booksInfo.length >= page * numOfFeedsPerLoad) {
        this.props.requestBooksAndUsers();
      }
    }
  }
}
