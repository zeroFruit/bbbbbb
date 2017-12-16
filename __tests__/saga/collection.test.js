import { call, put } from 'redux-saga/effects';
import * as saga from '../../src/sagas/collection';
import { requestEntity as re } from '../../src/sagas/collection/requestEntity';

describe('collection saga test', () => {
  describe('AsyncFetchCollectionRequest', () => {
    const params = {};
    const uid = 1;
    it('should call requestEntity myCollections', () => {
      const gen = saga.AsyncFetchCollectionRequest(params);

      expect(gen.next(params).value)
        .toEqual(call(re.myCollections, uid));
    });
  });

  describe('AsyncAddCollectionRequest', () => {
    const params = {
      payload: {
        label: 'label',
        bookIds: [1, 2]
      }
    };
    const uid = 1;
    it('should call requestEntity addCollection', () => {
      const { label, bookIds } = params.payload;
      const gen = saga.AsyncAddCollectionRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.addCollection, uid, label, bookIds));
    });
  });


  describe('AsyncDeleteCollectionRequest', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity removeCollection', () => {
      const gen = saga.AsyncDeleteCollectionRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.removeCollection, params.payload));
    });
  });


  describe('AsyncAddBooksToCollectionRequest', () => {
    const params = {
      payload: {
        id: 1,
        bookIds: [1, 2]
      }
    };
    it('should call requestEntity addBooksToCollection', () => {
      const { id, bookIds } = params.payload;
      const gen = saga.AsyncAddBooksToCollectionRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.addBooksToCollection, id, bookIds));
    });
  });


  describe('AsyncDeleteCollectionBookRequest', () => {
    const params = {
      payload: {
        id: 1,
        bookIds: [1, 2]
      }
    };
    it('should call requestEntity removeBooksInCollection', () => {
      const { id, bookIds } = params.payload;
      const gen = saga.AsyncDeleteCollectionBookRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.removeBooksInCollection, id, bookIds));
    });
  });


  describe('AsyncFetchOtherUserCollectionRequest', () => {
    const params = {
      payload: 1
    };
    it('should call requestEntity otherUserCollections', () => {
      const gen = saga.AsyncFetchOtherUserCollectionRequest(params);

      expect(gen.next().value)
        .toEqual(call(re.otherUserCollections, params.payload));
    });
  });
});
