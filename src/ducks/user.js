import { createReducer } from './helper';

export const types = {
  FETCH_ME_READY: 'user/fetch_me_ready',
  FETCH_ME_REQUEST: 'user/fetch_me_request',
  FETCH_ME_SUCCESS: 'user/fetch_me_success',

  FETCH_SELECTED_USER_READY: 'user/fetch_selected_user_ready',
  FETCH_SELECTED_USER_REQUEST: 'user/fetch_selected_user_request',
  FETCH_SELECTED_USER_SUCCESS: 'user/fetch_selected_user_success'
};

export const initialState = {
  isMyInfoFetched_: false,
  myDisplayName_: '',
  isSelectedUserInfoFetched_: false,
  selectedUserDisplayName_: ''
};

const me = {
  [types.FETCH_ME_READY]: (state, action) => ({
    isMyInfoFetched_: true
  }),
  [types.FETCH_ME_SUCCESS]: (state, action) => ({
    isMyInfoFetched_: false,
    myDisplayName_: action.payload.display_name
  })
};

const selectedUser = {
  [types.FETCH_SELECTED_USER_READY]: (state, action) => ({
    isSelectedUserInfoFetched_: true
  }),
  [types.FETCH_SELECTED_USER_SUCCESS]: (state, action) => ({
    isSelectedUserInfoFetched_: false,
    selectedUserDisplayName_: action.payload.display_name
  })
};

export default user = createReducer(initialState, {
  ...me,
  ...selectedUser
});

export const actions = {

};

export const selectors = {
  GetMyDisplayName: state => state.user.myDisplayName_,
  GetSelectedUserDisplayName: state => state.user.selectedUserDisplayName_,
  GetIsSelectedUserInfoFetched: state => state.user.isSelectedUserInfoFetched_
};
