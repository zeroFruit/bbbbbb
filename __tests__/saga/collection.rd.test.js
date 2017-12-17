import {
  requestData as rd
} from '../../src/sagas/collection/requestEntity';
import * as api from '../../src/sagas/collection/apiEntity';
import * as cmn from '../../src/sagas/_common';
import { types } from '../../src/ducks/collection';

describe('requestData', () => {
  describe('myCollections test', () => {
    it('should patch type when ready', () => {
      expect(rd.myCollections.ready())
        .toEqual({
          type: types.FETCH_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const myCollectionList = [{ id: 1 }, { id: 2 }];
      expect(rd.myCollections.success(myCollectionList))
        .toEqual({
          type: types.FETCH_COLLECTION.SUCCESS,
          payload: myCollectionList
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.myCollections.api(uid);
      const gen2 = api.fetchCollectionsApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('addCollection test', () => {
    it('should patch type when ready', () => {
      expect(rd.addCollection.ready())
        .toEqual({
          type: types.ADD_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const myCollectionList = [1, 2];
      expect(rd.addCollection.success(myCollectionList))
        .toEqual({
          type: types.ADD_COLLECTION.SUCCESS,
          payload: myCollectionList
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.addCollection.api(uid);
      const gen2 = api.addCollectionsApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('removeCollection test', () => {
    it('should patch type when ready', () => {
      expect(rd.removeCollection.ready())
        .toEqual({
          type: types.REMOVE_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.removeCollection.success())
        .toEqual({
          type: types.REMOVE_COLLECTION.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const cid = 0;
      const uid = 1;
      const gen1 = rd.removeCollection.api(cid, uid);
      const gen2 = api.removeCollectionsApi(cid, uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('addBooksToCollection test', () => {
    it('should patch type when ready', () => {
      expect(rd.addBooksToCollection.ready())
        .toEqual({
          type: types.ADD_BOOKS_TO_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.addBooksToCollection.success())
        .toEqual({
          type: types.ADD_BOOKS_TO_COLLECTION.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const cid = 0;
      const bids = [1, 2];
      const gen1 = rd.addBooksToCollection.api(cid, bids);
      const gen2 = api.addBooksToCollectionApi(cid, bids);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });

    it('should call extra fetching saga', () => {
      const result = { id: 1 };
      const gen1 = rd.addBooksToCollection.fetch(result);
      const gen2 = cmn.FetchBooksForCollection(result);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('removeBooksInCollection test', () => {
    it('should patch type when ready', () => {
      expect(rd.removeBooksInCollection.ready())
        .toEqual({
          type: types.REMOVE_COLLECTION_BOOKS.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      expect(rd.removeBooksInCollection.success())
        .toEqual({
          type: types.REMOVE_COLLECTION_BOOKS.SUCCESS,
          payload: {}
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.removeBooksInCollection.api(uid);
      const gen2 = api.removeBooksInCollectionApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });


  describe('otherUserCollections test', () => {
    it('should patch type when ready', () => {
      expect(rd.otherUserCollections.ready())
        .toEqual({
          type: types.FETCH_OTHER_USER_COLLECTION.READY,
          payload: {}
        });
    });

    it('should patch type with payload when success', () => {
      const collections = [{ id: 1 }, { id: 2 }];
      expect(rd.otherUserCollections.success(collections))
        .toEqual({
          type: types.FETCH_OTHER_USER_COLLECTION.SUCCESS,
          payload: collections
        });
    });

    it('should call matching api', () => {
      const uid = 0;
      const gen1 = rd.otherUserCollections.api(uid);
      const gen2 = api.fetchOtherUserCollectionApi(uid);
      expect(gen1.next().value)
        .toEqual(gen2.next().value);
    });
  });
});
