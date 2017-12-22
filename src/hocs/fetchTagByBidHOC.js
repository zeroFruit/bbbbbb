import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectors as tagSelectors,
  types as tagTypes,
  actions as tagActions
} from '../ducks/tag';

export const fetchTagByBidHOC = (WrappedComponent) => {
  class WithTag extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      const { id } = this.props;
      await this._fetchTags(id);
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

    _fetchTags = async (id) => {
      await this.props.AsyncFetchTagRequestAction(id);
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
  AsyncFetchTagRequestAction: id => ({
    type: tagTypes.FETCH_TAG_BY_BID.REQUEST,
    payload: { id }
  }),
  UnmountTagAction: tagActions.UnmountTag
}, dispatch);
