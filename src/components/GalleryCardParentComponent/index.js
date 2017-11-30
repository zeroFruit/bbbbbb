import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class GalleryCardParentComponent extends PureComponent {
  render() {
    const { bookInfo: { img_src, id, user_id } } = this.props;
    return (
      <TouchableHighlight
        style={ styles.container }
        onPress={ () => { this._onClickGalleryCard(id, user_id); } }>
        <Image
          style={ styles.image }
          source={ { uri: img_src } } />
      </TouchableHighlight>
    );
  }

  _onClickGalleryCard = (id, user) => {
    this.props.onClickGalleryCard(id, user);
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    borderWidth: .5,
    borderColor: 'black'
  },
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  }
});

export default GalleryCardParentComponent;
