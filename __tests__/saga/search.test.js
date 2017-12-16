import { call } from 'redux-saga/effects';
import * as saga from '../../src/sagas/search';
import { requestEntity as re } from '../../src/sagas/search/requestEntity';

describe('search saga test', () => {
  describe('AsyncFetchSearchResultRequest', () => {
    const params = {
      payload: 'search text'
    };
    it('should call requestEntity searchResult', () => {
      const gen = saga.AsyncFetchSearchResultRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.searchResult, params.payload));
    });
  });
});
