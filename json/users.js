const users = {
  "users": {
    "byId": {
      "1": {
        "id": 1,
        "display_name": "Couleur"
      },
      "2": {
        "id": 2,
        "display_name": "Larisa-K"
      },
      "3": {
        "id": 3,
        "display_name": "annca"
      },
      "4": {
        "id": 4,
        "display_name": "RitaE"
      }
    },
    "allIds": [1, 2, 3, 4]
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
