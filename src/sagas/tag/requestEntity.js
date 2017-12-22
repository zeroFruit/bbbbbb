import { types } from '../../ducks/tag';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  selectedTagByBid: {
    ready: () => patch(types.FETCH_TAG_BY_BID.READY),
    success: pl => patch(types.FETCH_TAG_BY_BID.SUCCESS, pl),
    api: bid => api.fetchBookTagByBidApi(bid)
  },
  selectedTagByTid: {
    ready: () => patch(types.FETCH_TAG_BY_TID.READY),
    success: pl => patch(types.FETCH_TAG_BY_TID.SUCCESS, pl),
    api: (athrid, titid) => api.fetchBookTagByTidApi(athrid, titid)
  }
};

export const requestEntity = {
  selectedTagByBid: fetchEntity.bind(null, requestData.selectedTagByBid),
  selectedTagByTid: fetchEntity.bind(null, requestData.selectedTagByTid)
};
