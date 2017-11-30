import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types, selectors } from '../ducks/user';

import ProgressBar from '../components/ProgressBar';

import { isEmpty } from '../utils/ObjectUtils';

export const fetchUserByIdHOC = (WrappedComponent) => {
  class WithUser extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    state = {
      isSelectedUserFetching: false
    };
    componentDidMount() {
      const { userId } = this.props;
      this.props.AsyncFetchSelectedUserInfoRequestAction(userId);
      this._setStateIsSelectedUserFetching(true);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isSelectedUserInfoFetched_) {
        this._setStateIsSelectedUserFetching(false);
      }
    }
    // componentWillUnmount() {
    //   this.props.UnmountSelectedUserAction();
    // }

    render() {
      if (this.state.isSelectedUserFetching) {
        return <ProgressBar />;
      }
      return (
        <WrappedComponent { ...this.props } />
      );
    }

    _isSelectedUserFetched = (props) => {
      return (props.isSelectedUserInfoFetched_ &&
        props.selectedUser_.id === props.userId);
    }

    _setStateIsSelectedUserFetching = (value) => {
      this.setState({ isSelectedUserFetching: value });
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithUser);
};

const mapStateToProps = state => ({
  selectedUser_: selectors.GetSelectedUser(state),
  isSelectedUserInfoFetched_: selectors.GetIsSelectedUserInfoFetched(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchSelectedUserInfoRequestAction: userId => ({
    type: types.FETCH_SELECTED_USER_REQUEST,
    payload: userId
  }),
  UnmountSelectedUserAction: () => ({
    type: types.FETCH_SELECTED_USER_UNMOUNT
  })
}, dispatch);
