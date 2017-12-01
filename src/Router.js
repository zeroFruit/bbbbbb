import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  TabRouter,
  createNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';

import { mapNavigateParamsToProps } from './hocs/mapNavigateParamsToProps';

import Splash from './screens/Splash';
import BookMark from './screens/BookMark/container';
import MyPage from './screens/MyPage';
import NewPost from './screens/NewPost';
import NewsFeed from './screens/NewsFeed/container';
import PostSelected from './screens/PostSelected';
import PostSelectedList from './screens/PostSelectedList/container';
import AuthorPage from './screens/AuthorPage';
import OtherPage from './screens/OtherPage';
import CollectionAddPage from './screens/CollectionAddPage';
import CollectionSelectPage from './screens/CollectionSelectPage/container';
import CollectionBookSelectPage from './screens/CollectionBookSelectPage/container';

import CustomTabBar from './components/TabBar';

class RouterComponent extends Component {
  render() {
    const RootNavigator = TabNavigator({
      splash: { screen: Splash },
      main: {
        screen: StackNavigator({
          tabs: {
            screen: CustomTabNavigator
          },
          NewPost: {
            screen: NewPost
          },
          collectionAdd: {
            screen: mapNavigateParamsToProps(CollectionAddPage)
          },
          collectionSelect: {
            screen: mapNavigateParamsToProps(CollectionSelectPage)
          },
          collectionBookSelect: {
            screen: mapNavigateParamsToProps(CollectionBookSelectPage)
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
    screen: mapNavigateParamsToProps(BookMark)
  },
  PostList: {
    screen: mapNavigateParamsToProps(PostSelectedList)
  },
  Post: {
    screen: mapNavigateParamsToProps(PostSelected)
  },
  Author: {
    screen: mapNavigateParamsToProps(AuthorPage)
  },
  Other: {
    screen: mapNavigateParamsToProps(OtherPage)
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

export const navigateToNested = (props, to, params, nestedScreenKey, nestedScreenParams = {}) => {
  const navigateAction = NavigationActions.navigate({
    routeName: to,
    params,
    action: NavigationActions.navigate({
      routeName: nestedScreenKey,
      params: nestedScreenParams
    })
  });
  props.navigation.dispatch(navigateAction);
};

export const getParamsFromNavigationState = (state) => {
  const stackNavIdx = state.index;
  const stackNavRoutes = state.routes[stackNavIdx];
  // Nav Tree 구조에 따라 달라진다.
  if (stackNavIdx === 0) {
    const { index, routes } = stackNavRoutes;
    const { params } = routes[index];
    return params;
  } else {
    return stackNavRoutes.params;
  }
};

export const renderHeaderWithNavigation = (navigation) => {
  const params = getParamsFromNavigationState(navigation.state);

  return (renderHeaderMethod) => {
    return renderHeaderMethod(params);
  };
};

export const setParamsToNavigation = (props, params) => {
  props.navigation.setParams({ ...params });
};

export const initParamsToNavigation = (props) => {
  props.navigation.setParams({});
};

export default RouterComponent;
