import { types } from '../../ducks/user';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
  me: { /* TODO: 병렬로 success, fetch 처리 */
    ready: () => patch(types.FETCH_ME.READY),
    success: pl => patch(types.FETCH_ME.SUCCESS, pl),
    api: uid => api.fetchUserApi(uid),
    fetch: result => cmn.FetchMyBooks(result)
  },
  selectedUser: {
    ready: () => patch(types.FETCH_SELECTED_USER.READY),
    success: pl => patch(types.FETCH_SELECTED_USER.SUCCESS, pl),
    api: uid => api.fetchUserApi(uid)
  },
  selectedUsers: {
    ready: () => patch(types.FETCH_SELECTED_USERS.READY),
    success: pl => patch(types.FETCH_SELECTED_USERS.SUCCESS, pl),
    api: uids => api.fetchUsersApi(uids)
  },
  selectedPostListUsers: {
    ready: () => patch(types.FETCH_SELECTED_POST_LIST_USERS.READY),
    success: pl => patch(types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS, pl),
    api: uids => api.fetchUsersApi(uids)
  }
};

export const requestEntity = {
  me: fetchEntity.bind(null, requestData.me),
  selectedUser: fetchEntity.bind(null, requestData.selectedUser),
  selectedUsers: fetchEntity.bind(null, requestData.selectedUsers),
  selectedPostListUsers: fetchEntity.bind(null, requestData.selectedPostListUsers)
};
