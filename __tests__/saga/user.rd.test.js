import {
  requestData as rd
} from '../../src/sagas/user/requestEntity';
import * as api from '../../src/sagas/user/apiEntity';
import * as cmn from '../../src/sagas/_common';
import { types } from '../../src/ducks/user';

describe('requestData', () => {
  describe('me test', () => {
    it('should patch type when ready', () => {
      expect(rd.me.ready())
        .toEqual({
          type: types.FETCH_ME.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const user = { id: 1 };
      expect(rd.me.success(user))
        .toEqual({
          type: types.FETCH_ME.SUCCESS,
          payload: user
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.me.api(uid);
      const gen2 = api.fetchUserApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });

    it('should fetch my books', () => {
      const books = [{ id: 1 }];
      const gen1 = rd.me.fetch(books);
      const gen2 = cmn.FetchMyBooks(books);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('selectedUser test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedUser.ready())
        .toEqual({
          type: types.FETCH_SELECTED_USER.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const user = { id: 1 };
      expect(rd.selectedUser.success(user))
        .toEqual({
          type: types.FETCH_SELECTED_USER.SUCCESS,
          payload: user
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.selectedUser.api(uid);
      const gen2 = api.fetchUserApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('selectedUsers test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedUsers.ready())
        .toEqual({
          type: types.FETCH_SELECTED_USERS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const users = [{ id: 1 }, { id: 2 }];
      expect(rd.selectedUsers.success(users))
        .toEqual({
          type: types.FETCH_SELECTED_USERS.SUCCESS,
          payload: users
        });
    });

    it('should call matching api', () => {
      const uids = [1, 2];
      const gen1 = rd.selectedUsers.api(uids);
      const gen2 = api.fetchUsersApi(uids);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('selectedPostListUsers test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedPostListUsers.ready())
        .toEqual({
          type: types.FETCH_SELECTED_POST_LIST_USERS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const users = [{ id: 1 }, { id: 2 }];
      expect(rd.selectedPostListUsers.success(users))
        .toEqual({
          type: types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS,
          payload: users
        });
    });

    it('should call matching api', () => {
      const uids = [1, 2];
      const gen1 = rd.selectedPostListUsers.api(uids);
      const gen2 = api.fetchUsersApi(uids);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
