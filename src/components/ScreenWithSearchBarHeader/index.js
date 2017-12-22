import React, { PureComponent } from 'react';
import { setParamsToNavigation, navigateTo } from '../../Router';
import { selectType, USER_ID } from '../../config';
import ViewManager from '../../ViewManager';
import * as _h from '../../ViewManager/_header';
import * as _t from '../../ViewManager/_title';

export default class ScreenWithSearchBarHeader extends PureComponent {
  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickSearchListItem: this._onClickSearchListItem
    });
  }

  _onClickSearchListItem = (athrid, titid) => {
    const key = 'PostList';
    const vm = new ViewManager(
      selectType.SELECT_FROM_SEARCH_LIST,
      selectType.SELECT_FROM_SEARCH_LIST,
      _h._getTagHeaderProps,
      _t._getTextTitleProps
    );
    const params = {
      athrid,
      titid,
      vm,
      selectType: selectType.SELECT_FROM_SEARCH_LIST
    };
    navigateTo(this.props, key, params);
  }
}
