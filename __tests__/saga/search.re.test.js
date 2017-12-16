import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/search/requestEntity';
import { types } from '../../src/ducks/search';

describe('requestEntity', () => {
  describe('searchResult test', () => {
    it('should ready > call > success', () => {
      const params = {
        payload: 'search text'
      };
      const gen = re.searchResult(params.payload);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_SEARCH_RESULT.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.searchResult.api, params.payload));

      const result = [{ id: 1 }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_SEARCH_RESULT.SUCCESS,
          payload: result
        }));
    });
  });
});
