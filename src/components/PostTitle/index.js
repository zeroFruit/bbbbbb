import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const { string } = PropTypes;

const propTypes = {
  title: string
};
const defaultProps = {
  title: ''
};

class PostTitle extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>{ this.props.title }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  title: {
    fontSize: 20,
    marginLeft: 10
  }
});

PostTitle.propTypes = propTypes;
PostTitle.defaultProps = defaultProps;

export default PostTitle;
