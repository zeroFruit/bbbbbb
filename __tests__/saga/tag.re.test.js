import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/tag/requestEntity';
import { types } from '../../src/ducks/tag';

describe('requestEntity', () => {
  describe('selectedTag test', () => {
    it('should ready > call > success', () => {
      const bid = 1;
      const gen = re.selectedTag(bid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_BOOK_TAG.READY,
          payload: {}
        }));
      expect(gen.next().value)
        .toEqual(call(rd.selectedTag.api, bid));

      const result = {};
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_BOOK_TAG.SUCCESS,
          payload: result
        }));
    });
  });
});
