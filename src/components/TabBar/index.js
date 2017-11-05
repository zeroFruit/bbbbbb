import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { takeFromArray } from '../../utils/ArrayUtils';

const NUM_OF_TABS = 3;

class CustomTabBar extends Component {
  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const Routes = takeFromArray(routes, NUM_OF_TABS);
    return (
      <View style={ styles.tabContainer }>
        {
          this.renderTabs(Routes, index)
        }
      </View>
    );
  }

  renderTabs(routes, selectedIndex) {
    const { navigation } = this.props;
    const labels = [
      '뉴스피드',
      '마이페이지',
      '북마크'
    ];
    return routes.map((route, index) => {
      const isActive = index === selectedIndex;
      return (
        <TouchableOpacity
          key={ route.routeName }
          style={ styles.tab }
          onPress={ () => { return navigation.navigate(route.routeName); } }>
          <Text style={ styles.label }>
            { labels[index] }
          </Text>
        </TouchableOpacity>
      );
    });
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  label: {
    fontSize: 15,
    color: 'black'
  }
});

export default CustomTabBar;
