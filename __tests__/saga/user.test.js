import { call } from 'redux-saga/effects';
import * as saga from '../../src/sagas/user';
import { requestEntity as re } from '../../src/sagas/user/requestEntity';

describe('user saga test', () => {
  describe('AsyncFetchMyInfoRequest', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity me', () => {
      const gen = saga.AsyncFetchMyInfoRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.me, params.payload));
    });
  });


  describe('AsyncFetchSelectedUserInfoRequest', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity selectedUser', () => {
      const gen = saga.AsyncFetchSelectedUserInfoRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.selectedUser, params.payload));
    });
  });


  describe('AsyncFetchUsersByUserIds', () => {
    const params = {
      payload: {
        users: [1, 2]
      }
    };
    it('should call requestEntity selectedUsers', () => {
      const gen = saga.AsyncFetchUsersByUserIds(params);

      expect(gen.next(params).value)
        .toEqual(call(re.selectedUsers, params.payload.users));
    });
  });


  describe('AsyncFetchUsersByUserIdsForPostList', () => {
    const params = {
      payload: {
        users: [1, 2]
      }
    };
    it('should call requestEntity selectedPostListUsers', () => {
      const gen = saga.AsyncFetchUsersByUserIdsForPostList(params);

      expect(gen.next(params).value)
        .toEqual(call(re.selectedPostListUsers, params.payload.users));
    });
  });
});
