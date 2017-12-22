import { branch, compose, setStatic } from 'recompose';
import { __fetchBooksAndUsersByTagHOC } from './__fetchBooksAndUsersByTagHOC';
import { fetchBooksAndUsersByTagHOC } from './fetchBooksAndUsersByTagHOC';
import { fetchBooksAndUsersByAuthorTagHOC } from './fetchBooksAndUsersByAuthorTagHOC';
import { selectType } from '../config';

export const enhance = WrappedComponent => compose(
  setStatic(
    'navigationOptions',
    WrappedComponent.navigationOptions
  ),
  selectBooksAndUsersFetchHOC(props => isFetchedByAuthor(props))(props => isFetchedFromSearchList(props)),
)(WrappedComponent);

const selectBooksAndUsersFetchHOC = isFetchByAuthorTag => isFetchedFromSearchList => branch(
  isFetchByAuthorTag,
  fetchBooksAndUsersByAuthorTagHOC,
  branch(
    isFetchedFromSearchList,
    __fetchBooksAndUsersByTagHOC,
    fetchBooksAndUsersByTagHOC
  )
);

const isFetchedByAuthor = props =>
  props.selectType === selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG;

const isFetchedFromSearchList = props =>
  props.selectType === selectType.SELECT_FROM_SEARCH_LIST;
