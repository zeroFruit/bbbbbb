import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  TabRouter,
  createNavigator,
  addNavigationHelpers
} from 'react-navigation';

import { mapNavigateParamsToProps } from './hocs/mapNavigateParamsToProps';

import Splash from './screens/Splash';
import BookMark from './screens/BookMark';
import MyPage from './screens/MyPage';
import NewsFeed from './screens/NewsFeed/container';
import PostSelected from './screens/PostSelected';

import CustomTabBar from './components/TabBar';

class RouterComponent extends Component {
  render() {
    const RootNavigator = TabNavigator({
      splash: { screen: Splash },
      main: {
        screen: StackNavigator({
          tabs: {
            screen: CustomTabNavigator
          }
        }, MainNavigatorOptions)
      }
    }, RootNavigatorOptions);

    return (
      <View style={ { flex: 1 } }>
        <RootNavigator style={ { backgroundColor: 'white' } } />
      </View>
    );
  }
}
const RootNavigatorOptions = {
  navigationOptions: {
    tabBarVisible: false
  },
  cardStyle: {
    backgroundColor: 'white'
  }
};

const MainNavigatorOptions = {
  navigationOptions: {
    title: 'Header Title',
    headerTitleStyle: {
      alignSelf: 'center'
    }
  }
};

const TabsNavigatorOptions = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'gray',
    inactiveTintColor: 'black'
  },
  swipeEnabled: false,
  lazyLoad: true,
  animationEnabled: false
};

/*
  Custom tab view navigator
*/
export const CustomTabConfig = TabRouter({
  NewsFeed: {
    screen: NewsFeed
  },
  MyPage: {
    screen: MyPage
  },
  BookMark: {
    screen: BookMark
  },
  Post: {
    screen: mapNavigateParamsToProps(PostSelected)
  }
}, TabsNavigatorOptions);

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={ styles.container }>
      <ActiveScreen
        navigation={ addNavigationHelpers({
          ...navigation,
          state: routes[index]
        }) } />
      <CustomTabBar navigation={ navigation } />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
const CustomTabNavigator = createNavigator(CustomTabConfig)(CustomTabView);

/*
  Helper functions
*/
export const navigateTo = (props, to, params) => {
  props.navigation.navigate(to, params);
};

export const getParamsFromNavigationState = state => {
  const { routes } = state;
  const { index } = routes[0];
  const { params } = routes[0].routes[index];
  return params;
};

export const renderHeaderWithNavigation = navigation => {
  const params = getParamsFromNavigationState(navigation.state);

  return renderHeaderMethod => {
    return renderHeaderMethod(params);
  };
};

export const setParamsToNavigation = (props, params) => {
  props.navigation.setParams({ ...params });
};

export default RouterComponent;
