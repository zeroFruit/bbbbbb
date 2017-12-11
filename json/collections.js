import { List } from 'immutable';
import _ from 'lodash';

const collections = {
  collections: {
    byId: {
      1: {
        id: 1,
        label: 'Collection1',
        book_ids: [1, 2]
      },
      2: {
        id: 2,
        label: 'Collection2',
        book_ids: [8, 9]
      }
    },
    allIds: [1, 2]
  }
};

class Collection {
  constructor() {
    if (!Collection.instance) {
      this._data = collections;
      Collection.instance = this;
    }

    return Collection.instance;
  }

  get() {
    return this._data;
  }

  getId() {
    return _.takeRight(this._data.collections.allIds)[0] + 1;
  }

  getById() {
    return this._data.collections.byId;
  }

  getAllIds() {
    return this._data.collections.allIds;
  }

  setCollectionToById(cid, collection) {
    const byId = this.getById();
    this._data.collections.byId = { ...byId, [cid]: collection };
  }

  omitCollectionById(cid) {
    const byId = this.getById();
    this._data.collections.byId = _.omit(byId, cid);
  }

  pushIdToAllIds(cid) {
    this._data.collections.allIds = List(this._data.collections.allIds).push(cid).sort().toJS();
  }

  spliceIdToAllIds(index) {
    const allIds = this.getAllIds();
    this._data.collections.allIds = allIds.splice(index, 1);
  }

  insert(label, bookIds) {
    const id = this.getId();
    const newCollection = { id, label, book_ids: bookIds };
    this.setCollectionToById(id, newCollection);
    this.pushIdToAllIds(id);
    return newCollection;
  }

  delete(id) {
    const byId = this.getById();
    const allIds = this.getAllIds();
    const index = allIds.indexOf(id);
    const removedCollection = byId[id];
    this.omitCollectionById(id);
    this.spliceIdToAllIds(index);
    return removedCollection;
  }

  deleteBooks(id, bookIds) {
    const byId = this.getById();
    const collection = byId[id];
    const removedCollection = { ...collection, book_ids: _.difference(collection.book_ids, bookIds) };
    this.setCollectionToById(id, removedCollection);
    return removedCollection;
  }

  updateBooks(cid, bids) {
    const byId = this.getById();
    const collection = byId[cid];
    const updatedCollection = { ...collection, book_ids: List(collection.book_ids).concat(bids).sort().toJS() };
    this.setCollectionToById(cid, updatedCollection);
    return updatedCollection;
  }
}

export { Collection };
