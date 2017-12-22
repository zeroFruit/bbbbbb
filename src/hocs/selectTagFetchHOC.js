import { branch, compose, setStatic } from 'recompose';
import { fetchTagByBidHOC } from './fetchTagByBidHOC';
import { fetchTagByTidHOC } from './fetchTagByTidHOC';
import { selectType } from '../config';

export const enhance = WrappedComponent => compose(
  setStatic(
    'navigationOptions',
    WrappedComponent.navigationOptions
  ),
  selectTagFetchHOC(props => shouldFetchByTid(props))
)(WrappedComponent);

const selectTagFetchHOC = shouldFetchByTid => branch(
  shouldFetchByTid,
  fetchTagByTidHOC,
  fetchTagByBidHOC
);

const shouldFetchByTid = props =>
  props.selectType === selectType.SELECT_FROM_SEARCH_LIST;
