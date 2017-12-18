import {
  tagTitlePropFormatter,
  textTitlePropFormatter
} from '../utils/PropUtils';
import {
  selectType as SelectType,
  headerType,
  headerTextType as HeaderTextType
} from '../config';

// _getPropsWhenFetchedFromNewsfeed
// _getPropsWhenSelectFromPostListClickedNickname
export const _getTextHeaderProps = props => ({
  type: headerType.TEXT,
  text: textTitlePropFormatter(
    -1,
    props.headerTitle || '북북북',
    HeaderTextType.NONE
  )
});

// _getTagsWhenClickedImage
export const _getTagHeaderProps = (props) => {
  const {
    selectedBookTitleTag_,
    selectedBookAuthorTag_,
    selectedBook_
  } = props;
  if (selectedBookTitleTag_ && selectedBookAuthorTag_) {
    return {
      type: headerType.TAG,
      text: [
        tagTitlePropFormatter(
          selectedBook_.title_tag_id,
          selectedBookTitleTag_,
          HeaderTextType.TITLE
        ),
        tagTitlePropFormatter(
          selectedBook_.author_tag_id,
          selectedBookAuthorTag_,
          HeaderTextType.AUTHOR
        )
      ]
    };
  }
  return { type: headerType.TAG, text: [] };
};

// _getPropsWhenClickedImage
export const _getUserHeaderProps = (props) => {
  const {
    selectedUserDisplayName_,
    selectedBook_: { user_id }
  } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      user_id,
      selectedUserDisplayName_,
      HeaderTextType.NICKNAME
    )
  };
};

// _getPropsWhenSelectFromCollectionButton
export const _getHeaderWithLabelsProps = (props) => {
  const { leftLabel, rightLabel, title } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      'id',
      title,
      HeaderTextType.NONE
    ),
    header: {
      leftLabel,
      rightLabel
    }
  };
};

// _getPropsForHeaderWithIcons
export const _getHeaderWithIconsProps = (props) => {
  const { leftIconName, rightIconName, title } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      'id',
      title,
      HeaderTextType.NONE
    ),
    header: {
      leftIconName,
      rightIconName
    }
  };
};
