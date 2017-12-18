import {
  tagTitlePropFormatter,
  textTitlePropFormatter
} from '../utils/PropUtils';
import {
  selectType as SelectType,
  postTitleType
} from '../config';

export const _getTextTitleProps = (props) => {
  const { userInfo } = props;
  return {
    type: postTitleType.TEXT,
    text: textTitlePropFormatter(userInfo.id, userInfo.display_name, 'nickname')
  };
};

export const _getTagTitleProps = (props) => {
  const { bookTitleTag, bookAuthorTag, bookInfo } = props;
  return {
    type: postTitleType.TAG,
    text: [
      tagTitlePropFormatter(bookInfo.title_tag_id, bookTitleTag, 'title'),
      tagTitlePropFormatter(bookInfo.author_tag_id, bookAuthorTag, 'author')
    ]
  };
};
