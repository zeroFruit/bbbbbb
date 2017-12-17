import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, types } from '../ducks/user';
import { USER_ID } from '../config';

const { func } = PropTypes;

export const fetchMyInfoHOC = (WrappedComponent) => {
  const propTypes = {
    AsyncFetchMyInfoRequestAction: func.isRequired
  };
  const defaultProps = {};

  class WithMyInfo extends PureComponent {
    static navigationOptions = WrappedComponent.navigationOptions;

    async componentDidMount() {
      this.props.AsyncFetchMyInfoRequestAction(USER_ID);
    }

    render() {
      return <WrappedComponent { ...this.props } />;
    }
  }

  WithMyInfo.propTypes = propTypes;
  WithMyInfo.defaultProps = defaultProps;

  return connect(null, mapDispatchToProps)(WithMyInfo);
};

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchMyInfoRequestAction: (userId) => {
    return ({
      type: types.FETCH_ME.REQUEST,
      payload: userId
    });
  }
}, dispatch);
