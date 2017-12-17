import { types } from '../../ducks/search';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  searchResult: {
    ready: () => patch(types.FETCH_SEARCH_RESULT.READY),
    success: pl => patch(types.FETCH_SEARCH_RESULT.SUCCESS, pl),
    api: txt => api.fetchSearchResultsApi(txt)
  }
};

export const requestEntity = {
  searchResult: fetchEntity.bind(null, requestData.searchResult)
};
