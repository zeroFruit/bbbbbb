import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import tag, { types, initialState as is } from '../../src/ducks/tag';

describe('reducer', () => {
  describe('reducer / fetchSelectedBook', () => {
    describe('FETCH_BOOK_TAG - READY', () => {
      it('should fetch flag to false', () => {
        expect(tag(is, {
          type: types.FETCH_BOOK_TAG.READY
        })).toEqual({
          ...is,
          selectedTag_: {
            ...is.selectedTag_,
            [helper.getStateFlagName(is.selectedTag_)]: false
          }
        });
      });
    });

    describe('FETCH_BOOK_TAG - SUCCESS', () => {
      it('should fetch flag to true with collection id list payload', () => {
        const params = {
          payload: {
            bookTitle: 'title',
            bookAuthor: 'author'
          }
        };
        expect(tag(is, {
          type: types.FETCH_BOOK_TAG.SUCCESS,
          payload: params.payload
        })).toEqual({
          ...is,
          selectedTag_: {
            ...is.selectedTag_,
            [helper.getStateFlagName(is.selectedTag_)]: true,
            [helper.getStatePayloadName(is.selectedTag_)]: {
              title: params.payload.bookTitle,
              author: params.payload.bookAuthor
            }
          }
        });
      });
    });
  });
});
