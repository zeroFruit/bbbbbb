import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import bm, { types, initialState as is } from '../../src/ducks/bookmark';

describe('reducer', () => {
  describe('reducer / add', () => {
    describe('ADD_BOOKMARK - READY', () => {
      it('should fetch flag', () => {
        expect(bm(is, {
          type: types.ADD_BOOKMARK.READY,
          payload: 1
        })).toEqual({
          ...is,
          isBookmarkAdded_: {
            ...is.isBookmarkAdded_,
            [helper.getStateFlagName(is.isBookmarkAdded_)]: true
          }
        });
      });
    });

    describe('ADD_BOOKMARK - SUCCESS', () => {
      it('should fetch flag with payload', () => {
        expect(bm(is, {
          type: types.ADD_BOOKMARK.SUCCESS,
          payload: 1
        })).toEqual({
          ...is,
          isBookmarkAdded_: {
            ...is.isBookmarkAdded_,
            [helper.getStateFlagName(is.isBookmarkAdded_)]: false,
          },
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: [1]
          }
        });
      });

      it('should concatenate payload', () => {
        expect(bm({
          ...is,
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: [1]
          }
        }, {
          type: types.ADD_BOOKMARK.SUCCESS,
          payload: 2
        })).toEqual({
          ...is,
          isBookmarkAdded_: {
            ...is.isBookmarkAdded_,
            [helper.getStateFlagName(is.isBookmarkAdded_)]: false
          },
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: [1, 2]
          }
        });
      });
    });

    describe('REMOVE_BOOKMARK - READY', () => {
      it('should fetch flag', () => {
        expect(bm(is, {
          type: types.REMOVE_BOOKMARK.READY
        })).toEqual({
          ...is,
          isBookmarkRemoved_: {
            ...is.isBookmarkRemoved_,
            [helper.getStateFlagName(is.isBookmarkRemoved_)]: true
          }
        });
      });
    });

    describe('REMOVE_BOOKMARK - SUCCESS', () => {
      it('should remove matched bookmark', () => {
        expect(bm({
          ...is,
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: [1]
          }
        }, {
          type: types.REMOVE_BOOKMARK.SUCCESS,
          payload: 1
        })).toEqual({
          ...is,
          isBookmarkRemoved_: {
            ...is.isBookmarkRemoved_,
            [helper.getStateFlagName(is.isBookmarkRemoved_)]: false
          },
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: []
          }
        })
      });
      it('should left bookmarks if there is no bookmarks already', () => {
        expect(bm(is, {
          type: types.REMOVE_BOOKMARK.SUCCESS,
          payload: 1
        })).toEqual({
          ...is,
          isBookmarkRemoved_: {
            ...is.isBookmarkRemoved_,
            [helper.getStateFlagName(is.isBookmarkRemoved_)]: false
          },
          myBookmarks_: {
            ...is.myBookmarks_,
            [helper.getStatePayloadName(is.myBookmarks_)]: []
          }
        });
      });
    });
  });

  describe('FETCH_BOOKMARK - READY', () => {
    it('should fetch flag', () => {
      expect(bm(is, {
        type: types.FETCH_BOOKMARK.READY
      })).toEqual({
        ...is,
        isBookmarkFetched_: {
          ...is.isBookmarkFetched_,
          [helper.getStateFlagName(is.isBookmarkFetched_)]: true
        }
      });
    });
  });

  describe('FETCH_BOOKMARK - SUCCESS', () => {
    it('should fetch flag with payload', () => {
      expect(bm(is, {
        type: types.FETCH_BOOKMARK.SUCCESS,
        payload: [1]
      })).toEqual({
        ...is,
        isBookmarkFetched_: {
          ...is.isBookmarkFetched_,
          [helper.getStateFlagName(is.isBookmarkFetched_)]: false
        },
        myBookmarks_: {
          ...is.myBookmarks_,
          [helper.getStatePayloadName(is.myBookmarks_)]: [1]
        }
      });
    });
  });
});
