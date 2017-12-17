import { types } from '../../ducks/tag';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  selectedTag: {
    ready: () => patch(types.FETCH_BOOK_TAG.READY),
    success: pl => patch(types.FETCH_BOOK_TAG.SUCCESS, pl),
    api: bid => api.fetchBookTagApi(bid)
  }
};

export const requestEntity = {
  selectedTag: fetchEntity.bind(null, requestData.selectedTag)
};
