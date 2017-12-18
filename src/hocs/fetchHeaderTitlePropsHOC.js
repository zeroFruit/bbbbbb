import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as tagSelectors } from '../ducks/tag';
import { selectors as bookSelectors } from '../ducks/book';

export const fetchHeaderTitlePropsHOC = (WrappedComponent) => {
  class WithHeaderTitle extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { vm } = this.props;
      const headerTitleProps = this._getHeaderTitleProps(vm);
      return (
        <WrappedComponent
          { ...this.props }
          headerTitleProps={ headerTitleProps } />
      );
    }

    _getHeaderTitleProps = (vm) => {
      return vm.getHeaderProps(this.props);
    }
  }

  return connect(mapStateToProps, null)(WithHeaderTitle);
};

const mapStateToProps = state => ({
  isSelectedBookTagFetched_: tagSelectors.GetIsSelectedBookTagFetched(state),
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state),
  selectedUserDisplayName_: userSelectors.GetSelectedUserDisplayName(state),
  selectedBook_: bookSelectors.GetSelectedBook(state)
});
