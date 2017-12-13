import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, types } from '../ducks/collection';

export const fetchCollectionsForOtherUserHOC = (WrappedComponent) => {
  class WithCollections extends PureComponent {
    async componentDidMount() {
      await this._fetchCollections(this.props.id);
    }

    render() {
      const { otherUserCollections_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          collections={ otherUserCollections_ } />
      );
    }

    _fetchCollections = async (userId) => {
      await this.props.AsyncFetchOtherUserCollectionsRequestAction(userId);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithCollections);
};

const mapStateToProps = state => ({
  isOtherUserCollectionsFetched_: selectors.GetIsOtherUserCollectionsFetched(state),
  otherUserCollections_: selectors.GetOtherUserCollections(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchOtherUserCollectionsRequestAction: userId => ({
    type: types.FETCH_OTHER_USER_COLLECTION.REQUEST,
    payload: userId
  })
}, dispatch);
