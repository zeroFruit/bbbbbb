import { List } from 'immutable';
import {
  action,
  stateType,
  createType,
  createReducer,
  createRequestTypes,
  createInitState,
  setStateFlag,
  setStatePayload,
  concatStatePayload,
  getStateFlag,
  getStatePayload
} from '../helper';

export const types = {
  FETCH_ME: createRequestTypes(['user', 'FETCH_ME']),
  FETCH_SELECTED_USER: createRequestTypes(['user', 'FETCH_SELECTED_USER']),
  FETCH_SELECTED_USERS: createRequestTypes(['user', 'FETCH_SELECTED_USERS']),
  FETCH_SELECTED_POST_LIST_USERS: createRequestTypes(['user', 'FETCH_SELECTED_POST_LIST_USERS']),

  FETCH_SELECTED_USER_UNMOUNT: createType(['user', 'FETCH_SELECTED_USER_UNMOUNT']),
  FETCH_SELECTED_USERS_UNMOUNT: createType(['user', 'FETCH_SELECTED_USERS_UNMOUNT']),
  FETCH_SELECTED_POST_LIST_USERS_UNMOUNT: createType(['user', 'FETCH_SELECTED_POST_LIST_USERS_UNMOUNT']),
  _FETCH_SELECTED_USERS: createType(['common', '_FETCH_SELECTED_USERS'])
};

export const initialState = {
  me_: createInitState('Me', 'Fetch', stateType.OBJ),
  selectedUser_: createInitState('SelectedUser', 'Fetch', stateType.OBJ),
  selectedUsers_: createInitState('SelectedUsers', 'Fetch', stateType.LIST),
  selectedPostListUsers_: createInitState('SelectedPostListUsers', 'Fetch', stateType.LIST)
};

const me = {
  [types.FETCH_ME.READY]: (state, action) => ({
    ...state,
    me_: setStateFlag(state.me_, true)
  }),
  [types.FETCH_ME.SUCCESS]: (state, action) => ({
    ...state,
    me_: setStatePayload(
      setStateFlag(state.me_, false),
      action.payload
    )
  })
};

const fetchUser = {
  [types.FETCH_SELECTED_USER.READY]: (state, action) => ({
    ...state,
    selectedUser_: setStateFlag(state.selectedUser_, false)

  }),
  [types.FETCH_SELECTED_USER.SUCCESS]: (state, action) => ({
    ...state,
    selectedUser_: setStatePayload(
      setStateFlag(state.selectedUser_, true),
      action.payload
    )
  })
};

const unfetchUser = {
  [types.FETCH_SELECTED_USER_UNMOUNT]: (state, action) => {
    return {
      ...state,
      selectedUser_: initialState.selectedUser_
    };
  }
};

const fetchUsers = {
  [types.FETCH_SELECTED_USERS.READY]: (state, action) => ({
    ...state,
    selectedUsers_: setStateFlag(state.selectedUsers_, false)
  }),
  [types.FETCH_SELECTED_USERS.SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedUsers_: concatStatePayload(
        setStateFlag(state.selectedUsers_, true),
        action.payload
      )
    });
  },
  [types._FETCH_SELECTED_USERS]: (state, action) => {
    return ({
      ...state,
      selectedUsers_: concatStatePayload(
        state.selectedUsers_,
        action.payload
      )
    });
  }
};

const unfetchUsers = {
  [types.FETCH_SELECTED_USERS_UNMOUNT]: (state, action) => {
    return ({
      ...state,
      selectedUsers_: initialState.selectedUsers_
    });
  }
};

const fetchPostListUsers = {
  [types.FETCH_SELECTED_POST_LIST_USERS.READY]: (state, action) => ({
    ...state,
    selectedPostListUsers_: setStateFlag(state.selectedPostListUsers_, false)
  }),
  [types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS]: (state, action) => {
    return ({
      ...state,
      selectedPostListUsers_: concatStatePayload(
        setStateFlag(state.selectedPostListUsers_, true),
        action.payload
      )
    });
  }
};

const unfetchPostListUsers = {
  [types.FETCH_SELECTED_POST_LIST_USERS_UNMOUNT]: (state, action) => {
    return ({
      ...state,
      selectedPostListUsers_: initialState.selectedPostListUsers_
    });
  }
};

export default user = createReducer(initialState, {
  ...me,
  ...fetchUser,
  ...unfetchUser,
  ...fetchUsers,
  ...unfetchUsers,
  ...fetchPostListUsers,
  ...unfetchPostListUsers
});

export const actions = {
  UnmountSelectedPostListUsers: () => action(types.FETCH_SELECTED_POST_LIST_USERS_UNMOUNT),
  UnmountSelectedNewsfeedUsers: () => action(types.FETCH_SELECTED_USERS_UNMOUNT)
};

export const selectors = {
  GetMe:                              state => getStatePayload(state.user.me_),
  GetSelectedUserDisplayName:         state => getStatePayload(state.user.selectedUser_).display_name,
  GetSelectedUser:                    state => getStatePayload(state.user.selectedUser_),
  GetSelectedUsers:                   state => getStatePayload(state.user.selectedUsers_),
  GetSelectedPostListUsers:           state => getStatePayload(state.user.selectedPostListUsers_),

  GetIsSelectedUserInfoFetched:       state => getStateFlag(state.user.selectedUser_),
  GetIsSelectedUsersFetched:          state => getStateFlag(state.user.selectedUsers_),
  GetIsSelectedPostListUsersFetched:  state => getStateFlag(state.user.selectedPostListUsers_),
};
