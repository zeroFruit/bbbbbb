import React, { PureComponent } from 'react';

import OtherPageBookGallery from '../../components/OtherPageBookGallery';
import { selectType } from '../../config';
import { navigateTo } from '../../Router';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

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
    const params = {
      id,
      user,
      vm: new ViewManager(
        selectType.SELECT_FROM_OTHERPAGE_CLICKED_IMAGE,
        selectType.SELECT_FROM_OTHERPAGE_CLICKED_IMAGE,
        _h._getUserHeaderProps,
        _t._getTagTitleProps
      ),
      selectType: selectType.SELECT_FROM_OTHERPAGE_CLICKED_IMAGE
    };
    navigateTo({ navigation: this.props.parentNavigation }, key, params);
  }
}

export default OtherPageBook;
