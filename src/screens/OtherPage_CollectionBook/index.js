import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import OtherPageCollectionBookGallery from '../../components/OtherPageCollectionBookGallery';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

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
    const params = {
      id,
      user,
      vm: new ViewManager(
        selectType.SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK,
        selectType.SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK,
        _h._getUserHeaderProps,
        _t._getTagTitleProps
      ),
      selectType: selectType.SELECT_FROM_OTHERPAGE_CLICKED_COLLECTION_BOOK
    };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default OtherPageCollectionBook;
