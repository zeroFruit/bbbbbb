import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const { string } = PropTypes;
const propTypes = {
  content: string
};
const defaultProps = {
  content: ''
};

class PostContent extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <Text>
            { this.props.content }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  content: {
    height: 60,
    borderWidth: 1,
    borderColor: 'black'
  }
});

PostContent.propTypes = propTypes;
PostContent.defaultProps = defaultProps;

export default PostContent;
