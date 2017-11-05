import React, { Component, Children } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const { element, object } = PropTypes;

const propTypes = {
  children: element.isRequired,
  headerStyle: object
};
const defaultProps = {
  headerStyle: {}
};

class Header extends Component {
  render() {
    return (
      <View style={ this.props.headerStyle }>
        { Children.only(this.props.children) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
});

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
