import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import HeaderTitleBar from '../HeaderTitleBar';
import HeaderLeftText from '../HeaderLeftText';
import HeaderRightText from '../HeaderRightText';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithBackTexts extends PureComponent {
  render() {
    const { headerTitleProps, leftLabel, rightLabel } = this.props;

    return (
      <View style={ styles.container }>
        <HeaderLeftText
          label={ leftLabel }
          onClickLeftText={ this._onClickLeftText } />
        <HeaderTitleBar
          type={ headerTitleProps.type }
          text={ headerTitleProps.text }
          onClickAuthorTagOfHeader={ () => {} } />
        <HeaderRightText
          label={ rightLabel }
          onClickRightText={ this._onClickRightText } />
      </View>
    );
  }

  _onClickLeftText = () => {
    this.props.onClickHeaderLeftButton();
  }

  _onClickRightText = () => {
    this.props.onClickHeaderRightButton();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

HeaderBarWithBackTexts.propTypes = propTypes;
HeaderBarWithBackTexts.defaultProps = defaultProps;

export default compose(fetchHeaderTitlePropsHOC)(HeaderBarWithBackTexts);
