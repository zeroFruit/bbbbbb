import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/user/requestEntity';
import { types } from '../../src/ducks/user';

describe('requestEntity', () => {
  describe('me test', () => {
    it('should ready > call > fetch > success', () => {
      const uid = 1;
      const gen = re.me(uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_ME.READY,
          payload: {}
        }));
      expect(gen.next({
        uid
      }).value)
        .toEqual(call(rd.me.api, uid));

      const result = { id: 1, book_ids: [1, 2] };
      expect(gen.next(result).value)
        .toEqual(call(rd.me.fetch, result));

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_ME.SUCCESS,
          payload: result
        }));
    });
  });


  describe('selectedUser test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const gen = re.selectedUser(uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_SELECTED_USER.READY,
          payload: {}
        }));
      expect(gen.next({
        uid
      }).value)
        .toEqual(call(rd.selectedUser.api, uid));

      const result = { id: 1, book_ids: [1, 2] };
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_SELECTED_USER.SUCCESS,
          payload: result
        }));
    });
  });


  describe('selectedUsers test', () => {
    it('should ready > call > success', () => {
      const uids = [1, 2];
      const gen = re.selectedUsers(uids);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_SELECTED_USERS.READY,
          payload: {}
        }));
      expect(gen.next({
        uids
      }).value)
        .toEqual(call(rd.selectedUsers.api, uids));

      const result = [{ id: 1, book_ids: [1, 2] }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_SELECTED_USERS.SUCCESS,
          payload: result
        }));
    });
  });


  describe('selectedPostListUsers test', () => {
    it('should ready > call > success', () => {
      const uids = [1, 2];
      const gen = re.selectedPostListUsers(uids);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_SELECTED_POST_LIST_USERS.READY,
          payload: {}
        }));
      expect(gen.next({
        uids
      }).value)
        .toEqual(call(rd.selectedPostListUsers.api, uids));

      const result = [{ id: 1, book_ids: [1, 2] }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS,
          payload: result
        }));
    });
  });
});
