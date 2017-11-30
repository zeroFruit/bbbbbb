import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import OtherPageCollectionGallery from '../../components/OtherPageCollectionGallery';

class OtherPageCollection extends PureComponent {
  render() {
    return (
      <OtherPageCollectionGallery
        id={ this.props.id }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, label) => {
    this.props.setStateSelectedCollectionId(id);
    this.props.setStateScreenType(this.props.SCREEN_TYPE.COLLECTION_BOOK_LIST);
  }
}

export default OtherPageCollection;
