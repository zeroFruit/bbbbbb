import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/book/requestEntity';
import { types } from '../../src/ducks/book';

describe('requestData', () => {
  describe('myBooks test', () => {
    it('should patch type when ready', () => {
      expect(rd.myBooks.ready())
        .toEqual({
          type: types.FETCH_MY_BOOKS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const myBookList = [{ id: 1 }, { id: 2 }];
      expect(rd.myBooks.success(myBookList))
        .toEqual({
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: myBookList
        });
    });
  });
});

describe('requestEntity', () => {
  describe('myBooks test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 1
      };
      const gen = re.myBooks(params.payload);
      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_MY_BOOKS.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.myBooks.api, params.payload));

      const result = [{ id: 1 }, { id: 2 }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_MY_BOOKS.SUCCESS,
          payload: result
        }));
    });
  });
});
