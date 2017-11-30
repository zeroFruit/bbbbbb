import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import OtherPageCollectionBookGallery from '../../components/OtherPageCollectionBookGallery';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';

class OtherPageCollectionBook extends PureComponent {
  render() {
    return (
      <OtherPageCollectionBookGallery
        id={ this.props.collectionId }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default OtherPageCollectionBook;
