const users = {
  users: {
    byId: {
      1: {
        id: 1,
        display_name: 'Couleur',
        books: [1, 2, 3]
      },
      2: {
        id: 2,
        display_name: 'Larisa-K',
        books: [4, 5]
      },
      3: {
        id: 3,
        display_name: 'annca',
        books: [6, 7, 8, 9]
      },
      4: {
        id: 4,
        display_name: 'RitaE',
        books: [10]
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
