import _ from 'lodash';
import { List } from 'immutable';

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
        collections: [2]
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

  getById() {
    return this._data.users.byId;
  }

  getByUserIds(userIds) {
    const byId = this.getById();
    const Users = _.map(userIds, userId => byId[userId]);
    return Users;
  }

  getByUserId(userId) {
    const byId = this.getById();
    return _.filter(byId, (user) => {
      return user.id === userId;
    })[0];
  }

  setCollection(userId, collectionId) {
    const user = this.getByUserId(userId);
    const newUser = {
      ...user,
      collections: [...user.collections, collectionId]
    };
    this._data.users.byId[userId] = newUser;
    return newUser;
  }

  deleteCollection(userId, collectionId) {
    const user = this.getByUserId(userId);
    const index = user.collections.indexOf(collectionId);
    const newUser = {
      ...user,
      collections: List(user.collections).delete(index).toJS()
    };
    this._data.users.byId[userId] = newUser;
    return newUser;
  }

  setBook(userId, bookId) {
    const user = this.getByUserId(userId);
    const newUser = {
      ...user,
      books: [...user.books, bookId]
    };
    this._data.users.byId[userId] = newUser;
    return newUser;
  }
}
export { User };
