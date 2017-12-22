import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectors as tagSelectors,
  types as tagTypes,
  actions as tagActions
} from '../ducks/tag';

export const fetchTagByTidHOC = (WrappedComponent) => {
  class WithTag extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      const { athrid, titid } = this.props;
      await this._fetchTags(athrid, titid);
    }

    render() {
      const {
        selectedBookTitleTag_,
        selectedBookAuthorTag_
      } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          selectedBookTitleTag={ selectedBookTitleTag_ }
          selectedBookAuthorTag={ selectedBookAuthorTag_ }
          resetTag={ this._resetTag } />
      );
    }

    _fetchTags = async (athrid, titid) => {
      await this.props.AsyncFetchTagRequestAction(athrid, titid);
    }

    _resetTag = () => {
      this.props.UnmountTagAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithTag);
};

const mapStateToProps = state => ({
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchTagRequestAction: (athrid, titid) => ({
    type: tagTypes.FETCH_TAG_BY_TID.REQUEST,
    payload: { athrid, titid }
  }),
  UnmountTagAction: tagActions.UnmountTag
}, dispatch);
