import { List } from 'immutable';
import * as helper from '../../src/ducks/helper';
import cln, { types, initialState as is } from '../../src/ducks/collection';

describe('reducer', () => {
  describe('reducer / fetch', () => {
    const collectionList = List([{ id: 1 }]).toJS();

    describe('FETCH_COLLECTION - READY', () => {
      it('should fetch flag', () => {
        expect(cln(is, {
          type: types.FETCH_COLLECTION.READY
        })).toEqual({
          ...is,
          myCollections_: {
            ...is.myCollections_,
            [helper.getStateFlagName(is.myCollections_)]: false
          }
        });
      });
    });
    describe('FETCH_COLLECTION - SUCCESS', () => {
      it('should fetch flag with list payload', () => {
        expect(cln(is, {
          type: types.FETCH_COLLECTION.SUCCESS,
          payload: collectionList
        })).toEqual({
          ...is,
          myCollections_: {
            ...is.myCollections_,
            [helper.getStateFlagName(is.myCollections_)]: true,
            [helper.getStatePayloadName(is.myCollections_)]: collectionList
          }
        });
      });

      it('should fetch empty list if no action.payload defined', () => {
        expect(cln(is, {
          type: types.FETCH_COLLECTION.SUCCESS
        })).toEqual({
          ...is,
          myCollections_: {
            ...is.myCollections_,
            [helper.getStateFlagName(is.myCollections_)]: true,
            [helper.getStatePayloadName(is.myCollections_)]: []
          }
        });
      });
    });

    describe('ADD_COLLECTION - READY', () => {
      it('should fetch flag to false', () => {
        expect(cln(is, {
          type: types.ADD_COLLECTION.READY
        })).toEqual({
          ...is,
          isCollectionAdded_: {
            ...is.isCollectionAdded_,
            [helper.getStateFlagName(is.isCollectionAdded_)]: false
          }
        })
      });
    });

    describe('ADD_COLLECTION - SUCCESS', () => {
      it('should fetch flag to true', () => {
        expect(cln(is, {
          type: types.ADD_COLLECTION.SUCCESS
        })).toEqual({
          ...is,
          isCollectionAdded_: {
            ...is.isCollectionAdded_,
            [helper.getStateFlagName(is.isCollectionAdded_)]: true
          }
        })
      });
    });

    describe('REMOVE_COLLECTION - READY', () => {
      it('should fetch flag to false', () => {
        expect(cln(is, {
          type: types.REMOVE_COLLECTION.READY
        })).toEqual({
          ...is,
          isCollectionRemoved_: {
            ...is.isCollectionRemoved_,
            [helper.getStateFlagName(is.isCollectionRemoved_)]: false
          }
        })
      });
    });

    describe('REMOVE_COLLECTION - SUCCESS', () => {
      it('should fetch flag to true', () => {
        expect(cln(is, {
          type: types.REMOVE_COLLECTION.SUCCESS
        })).toEqual({
          ...is,
          isCollectionRemoved_: {
            ...is.isCollectionRemoved_,
            [helper.getStateFlagName(is.isCollectionRemoved_)]: true
          }
        })
      });
    });

    describe('ADD_BOOKS_TO_COLLECTION - READY', () => {
      it('should fetch flag to false', () => {
        expect(cln(is, {
          type: types.ADD_BOOKS_TO_COLLECTION.READY
        })).toEqual({
          ...is,
          isBooksInCollectionAdded_: {
            ...is.isBooksInCollectionAdded_,
            [helper.getStateFlagName(is.isBooksInCollectionAdded_)]: false
          }
        })
      });
    });

    describe('ADD_BOOKS_TO_COLLECTION - SUCCESS', () => {
      it('should fetch flag to true', () => {
        expect(cln(is, {
          type: types.ADD_BOOKS_TO_COLLECTION.SUCCESS
        })).toEqual({
          ...is,
          isBooksInCollectionAdded_: {
            ...is.isBooksInCollectionAdded_,
            [helper.getStateFlagName(is.isBooksInCollectionAdded_)]: true
          }
        })
      });
    });

    describe('REMOVE_COLLECTION_BOOKS - READY', () => {
      it('should fetch flag to false', () => {
        expect(cln(is, {
          type: types.REMOVE_COLLECTION_BOOKS.READY
        })).toEqual({
          ...is,
          isBooksInCollectionRemoved_: {
            ...is.isBooksInCollectionRemoved_,
            [helper.getStateFlagName(is.isBooksInCollectionRemoved_)]: false
          }
        })
      });
    });

    describe('REMOVE_COLLECTION_BOOKS - SUCCESS', () => {
      it('should fetch flag to true', () => {
        expect(cln(is, {
          type: types.REMOVE_COLLECTION_BOOKS.SUCCESS
        })).toEqual({
          ...is,
          isBooksInCollectionRemoved_: {
            ...is.isBooksInCollectionRemoved_,
            [helper.getStateFlagName(is.isBooksInCollectionRemoved_)]: true
          }
        })
      });
    });

    describe('FETCH_OTHER_USER_COLLECTION - READY', () => {
      it('should fetch flag to false', () => {
        expect(cln(is, {
          type: types.FETCH_OTHER_USER_COLLECTION.READY
        })).toEqual({
          ...is,
          otherUserCollections_: {
            ...is.otherUserCollections_,
            [helper.getStateFlagName(is.otherUserCollections_)]: false
          }
        })
      });
    });

    describe('FETCH_OTHER_USER_COLLECTION - SUCCESS', () => {
      const collectionList = List([1, 2]).toJS();
      it('should fetch flag to true with collection id list payload', () => {
        expect(cln(is, {
          type: types.FETCH_OTHER_USER_COLLECTION.SUCCESS,
          payload: collectionList
        })).toEqual({
          ...is,
          otherUserCollections_: {
            ...is.otherUserCollections_,
            [helper.getStateFlagName(is.otherUserCollections_)]: true,
            [helper.getStatePayloadName(is.otherUserCollections_)]: collectionList
          }
        })
      });
    });
  });
});
