import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/tag/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchBookTagApi test', () => {
    it('should request book tag text', () => {
      const bid = 1;
      const gen = api.fetchBookTagApi(bid);
      expect(gen.next().value)
        .toEqual(call(agent.Book.fetchByBookId, bid));

      const author_tag_id = 1;
      const title_tag_id = 1;
      expect(gen.next({
        author_tag_id,
        title_tag_id
      }).value)
        .toEqual(call(
          agent.Tag.fetchByAuthorTagIdAndBookTagId,
          author_tag_id,
          title_tag_id
        ));
    });
  });
});
