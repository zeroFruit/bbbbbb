import { put, call } from 'redux-saga/effects';
import {
  requestData as rd,
  requestEntity as re
} from '../../src/sagas/collection/requestEntity';
import { types } from '../../src/ducks/collection';

describe('requestEntity', () => {
  describe('myCollections test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const gen = re.myCollections(uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        uid
      }).value)
        .toEqual(call(rd.myCollections.api, uid));

      const result = [1, 2];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_COLLECTION.SUCCESS,
          payload: result
        }));
    });
  });


  describe('addCollection test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const label = 'label';
      const bids =  [1, 2];
      const gen = re.addCollection(uid, label, bids);

      expect(gen.next().value)
        .toEqual(put({
          type: types.ADD_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        uid,
        label,
        bids
      }).value)
        .toEqual(call(rd.addCollection.api, uid, label, bids));

      const result = [1, 2];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.ADD_COLLECTION.SUCCESS,
          payload: result
        }));
    });
  });


  describe('removeCollection test', () => {
    it('should ready > call > success', () => {
      const cid = 1;
      const uid = 1;
      const gen = re.removeCollection(cid, uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        cid,
        uid
      }).value)
        .toEqual(call(rd.removeCollection.api, cid, uid));

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('removeCollection test', () => {
    it('should ready > call > success', () => {
      const cid = 1;
      const uid = 1;
      const gen = re.removeCollection(cid, uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        cid,
        uid
      }).value)
        .toEqual(call(rd.removeCollection.api, cid, uid));

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('addBooksToCollection test', () => {
    it('should ready > call > fetch > success', () => {
      const cid = 1;
      const bids = [1, 2];
      const gen = re.addBooksToCollection(cid, bids);

      expect(gen.next().value)
        .toEqual(put({
          type: types.ADD_BOOKS_TO_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        cid,
        bids
      }).value)
        .toEqual(call(rd.addBooksToCollection.api, cid, bids));

      const result = {
        book_ids: [1, 2]
      };
      expect(gen.next(result).value)
        .toEqual(call(rd.addBooksToCollection.fetch, result));
      expect(gen.next().value)
        .toEqual(put({
          type: types.ADD_BOOKS_TO_COLLECTION.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('removeBooksInCollection test', () => {
    it('should ready > call > success', () => {
      const cid = 1;
      const bids = [1, 2];
      const gen = re.removeBooksInCollection(cid, bids);

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION_BOOKS.READY,
          payload: {}
        }));
      expect(gen.next({
        cid,
        bids
      }).value)
        .toEqual(call(rd.removeBooksInCollection.api, cid, bids));

      expect(gen.next().value)
        .toEqual(put({
          type: types.REMOVE_COLLECTION_BOOKS.SUCCESS,
          payload: {}
        }));
    });
  });


  describe('otherUserCollections test', () => {
    it('should ready > call > success', () => {
      const uid = 1;
      const gen = re.otherUserCollections(uid);

      expect(gen.next().value)
        .toEqual(put({
          type: types.FETCH_OTHER_USER_COLLECTION.READY,
          payload: {}
        }));
      expect(gen.next({
        uid
      }).value)
        .toEqual(call(rd.otherUserCollections.api, uid));

      const result = [{ id: 1 }];
      expect(gen.next(result).value)
        .toEqual(put({
          type: types.FETCH_OTHER_USER_COLLECTION.SUCCESS,
          payload: result
        }));
    });
  });
});
