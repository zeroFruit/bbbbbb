import {
  types,
  initialState as is
} from '../../ducks/book';
import * as dh from '../../ducks/helper';
import * as sh from '../helper';
import * as api from './apiEntity';
import { USER_ID } from '../../config';
import { pickByKey } from '../../utils/ObjectUtils';

export const requestData = {
  myBooks: {
    ready: () => dh.patch(types.FETCH_MY_BOOKS.READY),
    success: pl => dh.patch(types.FETCH_MY_BOOKS.SUCCESS, pl),
    api: bid => api.fetchBookApi(bid)
  }
};

export const requestEntity = {
  myBooks: sh.fetchEntity.bind(null, requestData.myBooks)
};
