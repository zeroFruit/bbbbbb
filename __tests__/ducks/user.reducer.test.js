import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import usr, { types, initialState as is } from '../../src/ducks/user';

describe('reducer', () => {
  describe('reducer / me', () => {
    describe('FETCH_ME - READY', () => {
      it('should fetch flag to true', () => {
        expect(usr(is, {
          type: types.FETCH_ME.READY
        })).toEqual({
          ...is,
          me_: {
            ...is.me_,
            [helper.getStateFlagName(is.me_)]: true
          }
        })
      })
    });

    describe('FETCH_ME - SUCCESS', () => {
      const me = {
        display_name: 'zerofruit'
      };
      it('should fetch flag to false with user object payload', () => {
        expect(usr(is, {
          type: types.FETCH_ME.SUCCESS,
          payload: me
        })).toEqual({
          ...is,
          me_: {
            ...is.me_,
            [helper.getStateFlagName(is.me_)]: false,
            [helper.getStatePayloadName(is.me_)]: me
          }
        })
      });
    });
  });

  describe('reducer / fetchUser', () => {
    describe('FETCH_SELECTED_USER - READY', () => {
      it('should fetch flag to true', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_USER.READY
        })).toEqual({
          ...is,
          selectedUser_: {
            ...is.selectedUser_,
            [helper.getStateFlagName(is.selectedUser_)]: false
          }
        })
      })
    });

    describe('FETCH_SELECTED_USER - SUCCESS', () => {
      const user = {
        id: 1,
        display_name: 'zerofruit'
      };
      it('should fetch flag to false with user object payload', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_USER.SUCCESS,
          payload: user
        })).toEqual({
          ...is,
          selectedUser_: {
            ...is.selectedUser_,
            [helper.getStateFlagName(is.selectedUser_)]: true,
            [helper.getStatePayloadName(is.selectedUser_)]: user
          }
        })
      });
    });
  });

  describe('reducer / fetchUsers', () => {
    describe('FETCH_SELECTED_USERS - READY', () => {
      it('should fetch flag to true', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_USERS.READY
        })).toEqual({
          ...is,
          selectedUsers_: {
            ...is.selectedUsers_,
            [helper.getStateFlagName(is.selectedUsers_)]: false
          }
        })
      })
    });

    describe('FETCH_SELECTED_USERS - SUCCESS', () => {
      const users = List([{
        id: 1
      }, {
        id: 2
      }]).toJS();

      it('should fetch flag to false with users list payload', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_USERS.SUCCESS,
          payload: users
        })).toEqual({
          ...is,
          selectedUsers_: {
            ...is.selectedUsers_,
            [helper.getStateFlagName(is.selectedUsers_)]: true,
            [helper.getStatePayloadName(is.selectedUsers_)]: users
          }
        })
      });

      it('should concatenate users', () => {
        expect(usr({
          ...is,
          selectedUsers_: {
            ...is.selectedUsers_,
            [helper.getStatePayloadName(is.selectedUsers_)]: [users[0]]
          }
        }, {
          type: types.FETCH_SELECTED_USERS.SUCCESS,
          payload: [users[1]]
        })).toEqual({
          ...is,
          selectedUsers_: {
            ...is.selectedUsers_,
            [helper.getStateFlagName(is.selectedUsers_)]: true,
            [helper.getStatePayloadName(is.selectedUsers_)]: users
          }
        })
      });
    });
  });

  describe('reducer / fetchPostListUsers', () => {
    describe('FETCH_SELECTED_POST_LIST_USERS - READY', () => {
      it('should fetch flag to true', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_POST_LIST_USERS.READY
        })).toEqual({
          ...is,
          selectedPostListUsers_: {
            ...is.selectedPostListUsers_,
            [helper.getStateFlagName(is.selectedPostListUsers_)]: false
          }
        })
      })
    });

    describe('FETCH_SELECTED_POST_LIST_USERS - SUCCESS', () => {
      const users = List([{
        id: 1
      }, {
        id: 2
      }]).toJS();

      it('should fetch flag to false with users list payload', () => {
        expect(usr(is, {
          type: types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS,
          payload: users
        })).toEqual({
          ...is,
          selectedPostListUsers_: {
            ...is.selectedPostListUsers_,
            [helper.getStateFlagName(is.selectedPostListUsers_)]: true,
            [helper.getStatePayloadName(is.selectedPostListUsers_)]: users
          }
        })
      });

      it('should concatenate users', () => {
        expect(usr({
          ...is,
          selectedPostListUsers_: {
            ...is.selectedPostListUsers_,
            [helper.getStatePayloadName(is.selectedPostListUsers_)]: [users[0]]
          }
        }, {
          type: types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS,
          payload: [users[1]]
        })).toEqual({
          ...is,
          selectedPostListUsers_: {
            ...is.selectedPostListUsers_,
            [helper.getStateFlagName(is.selectedPostListUsers_)]: true,
            [helper.getStatePayloadName(is.selectedPostListUsers_)]: users
          }
        })
      });
    });
  });
});
