import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as bookSelectors, actions as bookActions, types as bookTypes } from '../ducks/book';

export const blockOnMomentumScrollEndHOC = (WrappedComponent) => {
  class WithBlockedHandler extends Component {
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
        this.props.UpdatePageAction();
        this.props.requestBooksAndUsers();
      }
    }
  }

  return connect(null, mapDispatchToProps)(WithBlockedHandler);
};

const mapDispatchToProps = dispatch => bindActionCreators({
  UpdatePageAction: bookActions.LoadNewsfeed
}, dispatch);
