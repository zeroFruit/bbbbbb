import { put, call } from 'redux-saga/effects';
import * as api from '../../src/sagas/collection/apiEntity';
import agent from '../../src/Agent';

describe('apiEntity', () => {
  describe('fetchCollectionsApi test', () => {
    it('should request user book', () => {
      const uid = 1;
      const gen = api.fetchCollectionsApi(uid);
      expect(gen.next().value)
        .toEqual(call(agent.User.fetchByUserId, uid));
      const collections = [1, 2];
      expect(gen.next({
        collections
      }).value)
        .toEqual(call(agent.Collection.fetchByIds, collections));
    });
  });


  describe('addCollectionsApi test', () => {
    it('should add collection', () => {
      const uid = 1;
      const label = 'label';
      const bids = [1, 2];
      const gen = api.addCollectionsApi(uid, label, bids);
      expect(gen.next().value)
        .toEqual(call(agent.Collection.insertCollection, label, bids));
      const cid = 1;
      expect(gen.next({
        uid,
        id: cid
      }).value)
        .toEqual(call(agent.User.insertCollection, uid, cid));
    });
  });


  describe('removeCollectionsApi test', () => {
    it('should remove collection', () => {
      const cid = 1;
      const uid = 1;
      const gen = api.removeCollectionsApi(cid, uid);
      expect(gen.next().value)
        .toEqual(call(agent.Collection.deleteCollection, cid));
      expect(gen.next({
        uid,
        id: cid
      }).value)
        .toEqual(call(agent.User.deleteCollection, uid, cid));
    });
  });


  describe('addBooksToCollectionApi test', () => {
    it('should add collection', () => {
      const cid = 1;
      const bids = [1, 2];
      const gen = api.addBooksToCollectionApi(cid, bids);
      expect(gen.next().value)
        .toEqual(call(agent.Collection.updateBooksToCollection, cid, bids));
    });
  });


  describe('removeBooksInCollectionApi test', () => {
    it('should remove collection', () => {
      const cid = 1;
      const bids = [1, 2];
      const gen = api.removeBooksInCollectionApi(cid, bids);
      expect(gen.next().value)
        .toEqual(call(agent.Collection.deleteCollectionBooks, cid, bids));
    });
  });


  describe('fetchOtherUserCollectionApi test', () => {
    it('should fetch other user collection', () => {
      const uid = 1;
      const gen = api.fetchOtherUserCollectionApi(uid);
      expect(gen.next().value)
        .toEqual(call(agent.User.fetchByUserId, uid));
      const collections = [1, 2];
      expect(gen.next({
        collections
      }).value)
        .toEqual(call(agent.Collection.fetchByIds, collections));
    });
  });
});
