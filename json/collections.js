import { List } from 'immutable';
import _ from 'lodash';

const collections = {
  collections: {
    byId: {
      1: {
        id: 1,
        label: 'Collection1',
        book_ids: [1, 2]
      }
    },
    allIds: [1]
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
    return this._data.collections.allIds.length + 1;
  }

  getById() {
    return this._data.collections.byId;
  }

  getAllIds() {
    return this._data.collections.allIds;
  }

  insert(label, bookIds) {
    const id = this.getId();
    const newCollection = { id, label, book_ids: bookIds };
    const byId = this.getById();
    this._data.collections.byId = { ...byId, [id]: newCollection };
    this._data.collections.allIds.push(id);
    return newCollection;
  }

  delete(id) {
    const byId = this.getById();
    const allIds = this.getAllIds();
    const index = allIds.indexOf(id);
    const removedCollection = byId[id];
    this._data.collections.byId = _.omit(byId, id);
    this._data.collections.allIds = allIds.splice(index, 1);
    return removedCollection;
  }

  updateBooks(cid, bids) {
    const byId = this.getById();
    const collection = byId[cid];
    const updatedCollection = { ...collection, book_ids: List(collection.book_ids).concat(bids).sort().toJS() };
    this._data.collections.byId = { ...byId, [cid]: updatedCollection };
    return updatedCollection;
  }
}

export { Collection };
