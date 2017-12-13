import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import search, { types, initialState as is } from '../../src/ducks/search';

describe('reducer', () => {
  describe('reducer / fetchResults', () => {
    describe('FETCH_SEARCH_RESULT - READY', () => {
      it('should fetch flag to true', () => {
        expect(search(is, {
          type: types.FETCH_SEARCH_RESULT.READY
        })).toEqual({
          ...is,
          searchResults_: {
            ...is.searchResults_,
            [helper.getStateFlagName(is.searchResults_)]: true
          }
        })
      });
    });

    describe('FETCH_SEARCH_RESULT - SUCCESS', () => {
      const searchResultList = List(['a', 'b']).toJS();
      it('should fetch flag to false with search result text list payload', () => {
        expect(search(is, {
          type: types.FETCH_SEARCH_RESULT.SUCCESS,
          payload: searchResultList
        })).toEqual({
          ...is,
          searchResults_: {
            ...is.searchResults_,
            [helper.getStateFlagName(is.searchResults_)]: false,
            [helper.getStatePayloadName(is.searchResults_)]: searchResultList
          }
        })
      });
    });

  })
})
