import { List } from 'immutable';
import { createReducer } from './helper';

export const types = {
  FETCH_ME_READY: 'user/fetch_me_ready',
  FETCH_ME_REQUEST: 'user/fetch_me_request',
  FETCH_ME_SUCCESS: 'user/fetch_me_success',

  FETCH_SELECTED_USER_READY: 'user/fetch_selected_user_ready',
  FETCH_SELECTED_USER_REQUEST: 'user/fetch_selected_user_request',
  FETCH_SELECTED_USER_SUCCESS: 'user/fetch_selected_user_success',
  FETCH_SELECTED_USER_UNMOUNT: 'user/fetch_selected_user_unmount',

  FETCH_SELECTED_POST_LIST_USERS_READY: 'user/fetch_selected_post_list_users_ready',
  FETCH_SELECTED_POST_LIST_USERS_REQUEST: 'user/fetch_selected_post_list_users_request',
  FETCH_SELECTED_POST_LIST_USERS_SUCCESS: 'user/fetch_selected_post_list_users_success',

  FETCH_SELECTED_USERS_REQUEST: 'user/fetch_selected_users_request',
  FETCH_SELECTED_USERS_READY: 'user/fetch_selected_users_ready',
  FETCH_SELECTED_USERS_SUCCESS: 'user/fetch_selected_users_success'
};

export const initialState = {
  isMyInfoFetched_: false,
  myDisplayName_: '',
  me_: {},
  isSelectedUserInfoFetched_: false,
  selectedUserDisplayName_: '',
  selectedUser_: {},
  isSelectedUsersFetched_: false,
  selectedUsers_: List([]).toJS(),
  isSelectedPostListUsersFetched_: false,
  selectedPostListUsers_: List([]).toJS()
};

const me = {
  [types.FETCH_ME_READY]: (state, action) => ({
    ...state,
    isMyInfoFetched_: true
  }),
  [types.FETCH_ME_SUCCESS]: (state, action) => ({
    ...state,
    isMyInfoFetched_: false,
    myDisplayName_: action.payload.display_name,
    me_: action.payload
  })
};

const selectedUser = {
  [types.FETCH_SELECTED_USER_READY]: (state, action) => ({
    ...state,
    isSelectedUserInfoFetched_: false
  }),
  [types.FETCH_SELECTED_USER_SUCCESS]: (state, action) => ({
    ...state,
    isSelectedUserInfoFetched_: true,
    selectedUserDisplayName_: action.payload.display_name,
    selectedUser_: { ...action.payload }
  }),
  [types.FETCH_SELECTED_USER_UNMOUNT]: (state, action) => {
    return {
      isSelectedUserInfoFetched_: false,
      selectedUserDisplayName_: initialState.selectedUserDisplayName_,
      selectedUser_: initialState.selectedUser_
    };
  }
};

const fetchUsers = {
  [types.FETCH_SELECTED_USERS_READY]: (state, action) => ({
    ...state,
    isSelectedUsersFetched_: false
  }),
  [types.FETCH_SELECTED_USERS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedUsers_: List(state.selectedUsers_).concat(action.payload).toJS(),
      isSelectedUsersFetched_: true
    });
  }
};

const fetchPostListUsers = {
  [types.FETCH_SELECTED_POST_LIST_USERS_READY]: (state, action) => ({
    ...state,
    isSelectedPostListUsersFetched_: false
  }),
  [types.FETCH_SELECTED_POST_LIST_USERS_SUCCESS]: (state, action) => {
    // console.log('reducer', action.payload);
    return ({
      ...state,
      selectedPostListUsers_: List(state.selectedPostListUsers_).concat(action.payload).toJS(),
      isSelectedPostListUsersFetched_: true
    });
  }
};

export default user = createReducer(initialState, {
  ...me,
  ...selectedUser,
  ...fetchUsers,
  ...fetchPostListUsers
});

export const actions = {

};

export const selectors = {
  GetMyDisplayName: state => state.user.myDisplayName_,
  GetMe: state => state.user.me_,
  GetSelectedUserDisplayName: state => state.user.selectedUserDisplayName_,
  GetSelectedUser: state => state.user.selectedUser_,
  GetIsSelectedUserInfoFetched: state => state.user.isSelectedUserInfoFetched_,
  GetIsSelectedUsersFetched: state => state.user.isSelectedUsersFetched_,
  GetSelectedUsers: state => state.user.selectedUsers_,
  GetIsSelectedPostListUsersFetched: state => state.user.isSelectedPostListUsersFetched_,
  GetSelectedPostListUsers: state => state.user.selectedPostListUsers_
};
