import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';

import {
  renderHeaderWithNavigation,
  setParamsToNavigation,
  navigateTo,
  navigateToNested
} from '../../Router';
import { selectType, SCREEN_WIDTH, USER_ID, ROTATE } from '../../config';

import Header from '../../components/Header';
import HeaderBarWithTexts from '../../components/HeaderBarWithTexts';
import PostEditPanel from '../../components/PostEditPanel';
import PostEditTextArea from '../../components/PostEditTextArea';
import ProgressBar from '../../components/ProgressBar';

import { enhancer as defaultViewWhileNoParams } from '../../hocs/withDefaultViewWhileNoHeaderParamsHOC';

const renderHeader = defaultViewWhileNoParams((params) => {
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithTexts
        title="페이지 업로드"
        leftLabel="뒤로"
        rightLabel="완료"
        onClickHeaderRightButton={ params.onClickHeaderRightButton ? params.onClickHeaderRightButton : () => {} }
        onClickHeaderLeftButton={ params.onClickHeaderLeftButton ? params.onClickHeaderLeftButton : () => {} }
        selectType={ selectType.SELECT_FROM_COLLECTION_CARD } />
    </Header>
  );
});

class NewPostWrite extends PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => renderHeaderWithNavigation(navigation)(renderHeader)
  }

  state = {
    bookTitle: '',
    bookAuthor: '',
    content: '',
    rotateIndex: 0,
    isBookAdding: false
  };

  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickHeaderRightButton: this._onClickHeaderCompleteButton,
      onClickHeaderLeftButton: () => {}
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isBookAdd_) {
      navigateToNested(this.props, 'tabs', {}, 'MyPage', {});
    }
  }

  render() {
    if (this.state.isBookAdding) {
      return <ProgressBar />;
    }

    const { photo } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.preview }>
          <Image
            style={ styles.previewImage }
            source={ { uri: photo.image.uri } } />
        </View>
        <PostEditPanel
          label="책 제목"
          placeholder="책 제목을 입력해주세요."
          textValue={ this.state.bookTitle }
          onChangeText={ this._onChangeBookTitle } />
        <PostEditPanel
          label="작가 이름"
          placeholder="작가 이름을 입력해주세요."
          textValue={ this.state.bookAuthor }
          onChangeText={ this._onChangeBookAuthor } />
        <PostEditTextArea
          textValue={ this.state.content }
          onChangeText={ this._onChangeContent } />
      </View>
    );
  }

  _onClickHeaderCompleteButton = async () => {
    const { bookTitle, bookAuthor, content } = this.state;
    if (bookTitle === '' || bookAuthor === '' || content === '') {
      Alert.alert('내용을 입력해주세요.');
    } else {
      await this._setStateIsBookAdding(true);
      const book = {
        bookTitle,
        bookAuthor,
        content,
        img_src: this.props.photo.image.uri,
        user_id: USER_ID
      };
      await this.props.AsyncAddBookAction(book);
    }
  }

  _onChangeBookTitle = title => this._setStateBookTitle(title);

  _onChangeBookAuthor = author => this._setStateBookAuthor(author);

  _onChangeContent = content => this._setStateContent(content);

  _onBookAddComplete = () => {

  }

  _setStateBookTitle = (title) => {
    this.setState({ bookTitle: title });
  }
  _setStateBookAuthor = (author) => {
    this.setState({ bookAuthor: author });
  }
  _setStateContent = (content) => {
    this.setState({ content });
  }

  _setStateIsBookAdding = (state) => {
    this.setState({ isBookAdding: state });
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  preview: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  previewImage: {
    height: SCREEN_WIDTH,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    // transform: [
    //   {
    //     rotate: '90deg'
    //   }
    // ]
  }
});

export default NewPostWrite;
