import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { selectors as bookmarkSelectors } from '../ducks/bookmark';
import { selectors as bookSelectors } from '../ducks/book';
import { differenceWith } from '../utils/ArrayUtils';


export const filterMyBookmarksFromCollectionBooksHOC = (WrappedComponent) => {
  class WithFilteredMyBookmarks extends PureComponent {
    render() {
      const { selectedBooksForCollection_, bookmarks } = this.props;
      const filteredBookmarks = differenceWith(bookmarks, selectedBooksForCollection_, (bm, sb) =>  bm.id === sb.id)
      return (
        <WrappedComponent
          { ...this.props }
          filteredBookmarks={ filteredBookmarks } />
      );
    }
  }

  return connect(mapStateToProps, null)(WithFilteredMyBookmarks);
};

const mapStateToProps = state => ({
  myBookmarks_: bookmarkSelectors.GetMyBookmarks(state),
  selectedBooksForCollection_: bookSelectors.GetSelectedBooksForCollection(state)
});
