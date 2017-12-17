import { call } from 'redux-saga/effects';
import * as saga from '../../src/sagas/tag';
import { requestEntity as re } from '../../src/sagas/tag/requestEntity';

describe('tag saga test', () => {
  describe('AsyncFetchTagRequest', () => {
    const params = {
      payload: {
        id: 1
      }
    };
    it('should call requestEntity searchResult', () => {
      const gen = saga.AsyncFetchTagRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.selectedTag, params.payload.id));
    });
  });
});
