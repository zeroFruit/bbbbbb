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

  insert(label, bookIds) {
    const id = this.getId();
    const newCollection = { id, label, book_ids: bookIds };
    const byId = this.getById();
    this._data.collections.byId = { ...byId, [id]: newCollection };
    this._data.collections.allIds.push(id);
    return newCollection;
  }


}

export { Collection };
