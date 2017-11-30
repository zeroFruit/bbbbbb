import React, { PureComponent } from 'react';

import OtherPageBookGallery from '../../components/OtherPageBookGallery';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';

class OtherPageBook extends PureComponent {
  render() {
    return (
      <OtherPageBookGallery
        id={ this.props.id }
        onClickGalleryCard={ this._onClickGalleryCard } />
    );
  }

  _onClickGalleryCard = (id, user) => {
    const key = 'Post';
    const params = { id, user, selectType: selectType.SELECT_FROM_OTHERPAGE_CLICKED_IMAGE };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default OtherPageBook;
