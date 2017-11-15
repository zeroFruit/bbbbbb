const users = {
  users: {
    byId: {
      1: {
        id: 1,
        display_name: '응그래',
        books: [1, 2, 3],
        collections: [1]
      },
      2: {
        id: 2,
        display_name: '안경 쓴 주형',
        books: [4, 5],
        collections: []
      },
      3: {
        id: 3,
        display_name: '북페이스',
        books: [6, 7, 8, 9],
        collections: []
      },
      4: {
        id: 4,
        display_name: '익명의 유저',
        books: [10],
        collections: []
      }
    },
    allIds: [1, 2, 3, 4]
  }
};

class User {
  constructor() {
    if (!User.instance) {
      this._data = users;
      User.instance = this;
    }

    return User.instance;
  }

  set(newUsers) {
    this._data = newUsers;
  }

  get() {
    return this._data;
  }
}
export { User };
