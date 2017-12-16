import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/search/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchSearchResultsApi test', () => {
    it('should request user book', () => {
      const txt = 'search text';
      const gen = api.fetchSearchResultsApi(txt);
      expect(gen.next().value)
        .toEqual(call(agent.Search.fetchBookLabelByText, txt));
    });
  });
});
