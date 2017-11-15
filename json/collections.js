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
}

export { Collection };
