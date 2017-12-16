import {
  requestData as rd
} from '../../src/sagas/search/requestEntity';
import * as api from '../../src/sagas/search/apiEntity';
import * as cmn from '../../src/sagas/_common';
import { types } from '../../src/ducks/search';

describe('requestData', () => {
  describe('searchResult test', () => {
    it('should patch type when ready', () => {
      expect(rd.searchResult.ready())
        .toEqual({
          type: types.FETCH_SEARCH_RESULT.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const searchResults = [{ id: 1 }, { id: 2 }];
      expect(rd.searchResult.success(searchResults))
        .toEqual({
          type: types.FETCH_SEARCH_RESULT.SUCCESS,
          payload: searchResults
        });
    });

    it('should call matching api', () => {
      const txt = 'search text';
      const gen1 = rd.searchResult.api(txt);
      const gen2 = api.fetchSearchResultsApi(txt);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
