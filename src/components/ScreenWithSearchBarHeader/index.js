import React, { PureComponent } from 'react';
import { setParamsToNavigation, navigateTo } from '../../Router';
import { selectType, USER_ID } from '../../config';

export default class ScreenWithSearchBarHeader extends PureComponent {
  componentWillMount() {
    setParamsToNavigation(this.props, {
      onClickSearchListItem: this._onClickSearchListItem
    });
  }

  _onClickSearchListItem = (bookId) => {
    const key = 'PostList';
    const params = { id: bookId, selectType: selectType.SELECT_FROM_SEARCH_LIST };
    navigateTo(this.props, key, params);
  }
}
