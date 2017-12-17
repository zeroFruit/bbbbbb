import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/user/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchUserApi test', () => {
    it('should request user', () => {
      const uid = 1;
      const gen = api.fetchUserApi(uid);
      expect(gen.next().value)
        .toEqual(call(agent.User.fetchByUserId, uid));
    });
  });


  describe('fetchUsersApi test', () => {
    it('should request users', () => {
      const uids = [1, 2];
      const gen = api.fetchUsersApi(uids);
      expect(gen.next().value)
        .toEqual(call(agent.User.fetchByUserIds, uids));
    });
  });
});
