import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Avatar, ButtonGroup } from 'react-native-elements';

import { takeFromArray } from '../../utils/ArrayUtils';
import { isObjectHasProperty } from '../../utils/ObjectUtils';
import logger from '../../utils/LogUtils';
import {
  navigateTo,
  getParamsFromNavigationState,
  setParamsToNavigation,
  renderHeaderWithNavigation
} from '../../Router';

import MyPageBookGallery from '../../components/MyPageBookGallery';
import Header from '../../components/Header';
import PostAddingPanel from '../../components/PostAddingPanel';

import agent from '../../Agent';
import { selectType, USER_ID } from '../../config';

const NUM_OF_CARDS_IN_GALLERY = 7;

const renderHeader = (params) => {
  const headerTitle = isObjectHasProperty(params, 'my') ? params.my.display_name : 'Loading';
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <Text style={ styles.headerText }>
        { headerTitle }
      </Text>
    </Header>
  );
};

class MyPage extends Component {
  static navigationOptions = {
    header: ({ navigation }) => { return renderHeaderWithNavigation(navigation)(renderHeader); }
  }
  state = {
    myGalleryCardsProps: []
  };

  async componentDidMount() {
    try {
      await this.fetchMyGalleryCards(USER_ID);
      await this.fetchMyInfo(USER_ID);
    } catch (e) {
      logger.error(e);
    }
  }

  render() {
    const { myGalleryCardsProps } = this.state;
    const buttons = this.getMyPageButtons();

    return (
      <View style={ styles.container }>
        <View style={ styles.top }>
          <View style={ styles.myProfileContainer }>
            <Text style={ styles.myProfileText }>
              {`
                마음에 좋은 책을 읽습니다.
                가장 최근에는
                한병철 - 에로스의 종말을
                읽었습니다.
              `}
            </Text>
          </View>
        </View>

        <View style={ styles.body }>
          <PostAddingPanel />
          <MyPageBookGallery
            galleryCardsProps={ myGalleryCardsProps }
            onClickGalleryCard={ this.onClickGalleryCard } />
        </View>
      </View>
    );
  }

  fetchMyGalleryCards = async (userId) => {
    const images = await agent.Book.fetchByUserId(userId);
    const fetchedCards = takeFromArray(images, NUM_OF_CARDS_IN_GALLERY);
    const myGalleryCardsProps = this.arrangeGalleryCards(fetchedCards);
    this.setState({ myGalleryCardsProps });
  }

  fetchMyInfo = async (userId) => {
    const my = await agent.User.fetchByUserId(userId);
    setParamsToNavigation(this.props, { my });
  }

  arrangeGalleryCards = (cards) => {
    return cards.map((card) => {
      return this.getCardInfo(card);
    });
  }

  getMyPageButtons = () => {
    return [{
      element: MyBookListBtn
    }, {
      element: MyCollectionListBtn
    }];
  }

  onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_MYPAGE_CLICKED_IMAGE };
    navigateTo(this.props, key, params);
  }

  getCardInfo = (card) => {
    const { id, img_src, user_id, views, tags } = card;
    return {
      id,
      views,
      tags,
      user: user_id,
      imgSrc: img_src
    };
  }
}

const MyPageButton = ({ label }) => { return <Text>{ label }</Text>; };
const MyBookListBtn = () => { return <MyPageButton label="책" />; };
const MyCollectionListBtn = () => { return <MyPageButton label="컬렉션" />; };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 0,
    backgroundColor: 'white'
  },
  header: {
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  headerText: {
    fontSize: 20
  },
  top: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  body: {
    paddingTop: 5,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  buttonGroup: {
    paddingHorizontal: 0
  },
  myAvatarContainer: {
    flex: 1,
    alignItems: 'center'
  },
  myProfileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  myProfileText: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10
  }
});

export default MyPage;
