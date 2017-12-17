import {
  requestData as rd
} from '../../src/sagas/tag/requestEntity';
import * as api from '../../src/sagas/tag/apiEntity';
import * as cmn from '../../src/sagas/_common';
import { types } from '../../src/ducks/tag';

describe('requestData', () => {
  describe('selectedTag test', () => {
    it('should patch type when ready', () => {
      expect(rd.selectedTag.ready())
        .toEqual({
          type: types.FETCH_BOOK_TAG.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const result = {};
      expect(rd.selectedTag.success(result))
        .toEqual({
          type: types.FETCH_BOOK_TAG.SUCCESS,
          payload: result
        });
    });

    it('should call matching api', () => {
      const bid = 1;
      const gen1 = rd.selectedTag.api(bid);
      const gen2 = api.fetchBookTagApi(bid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
