import { branch, compose, setStatic } from 'recompose';
import { fetchBooksAndUsersByTagHOC } from './fetchBooksAndUsersByTagHOC';
import { fetchBooksAndUsersByAuthorTagHOC } from './fetchBooksAndUsersByAuthorTagHOC';
import { selectType } from '../config';

export const enhance = WrappedComponent => compose(
  setStatic(
    'navigationOptions',
    WrappedComponent.navigationOptions
  ),
  selectFetchHOC(props => isFetchedByAuthor(props)),
)(WrappedComponent);

const selectFetchHOC = isFetchByAuthorTag => branch(
  isFetchByAuthorTag,
  fetchBooksAndUsersByAuthorTagHOC,
  fetchBooksAndUsersByTagHOC
);

const isFetchedByAuthor = props =>
  props.selectType === selectType.SELECT_FROM_POST_CLICKED_AUTHOR_TAG;
