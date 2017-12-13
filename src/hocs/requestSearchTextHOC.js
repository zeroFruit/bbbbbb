import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types, selectors } from '../ducks/search';

export const requestSearchTextHOC = (WrappedComponent) => {
  class WithSearchResults extends PureComponent {
    render() {
      return (
        <WrappedComponent
          { ...this.props }
          requestSearch={ this._requestSearch } />
      );
    }
    _requestSearch = (searchText) => {
      this.props.AsyncSearchAction(searchText);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithSearchResults);
};

const mapStateToProps = state => ({
  isSearching_: selectors.GetIsSearching(state),
  searchResults_: selectors.GetSearchResults(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncSearchAction: searchText => ({
    type: types.FETCH_SEARCH_RESULT.REQUEST,
    payload: searchText
  })
}, dispatch);
