import _ from 'lodash';

const bookmarks = {
  bookmarks: {
    byId: {
      1: {
        id: 1,
        user_id: 1,
        book_ids: [4, 9]
      },
      2: {
        id: 2,
        user_id: 2,
        book_ids: [2]
      },
    },
    allIds: [1, 2]
  }
};

class Bookmark {
  constructor() {
    if (!Bookmark.instance) {
      this._data = bookmarks;
      Bookmark.instance = this;
    }

    return Bookmark.instance;
  }

  set(bookmark) {
    this._data = bookmark;
  }

  setToById(userId, bookId) {
    let bookmarkId;
    const { bookmarks } = this._data;
    const { byId } = bookmarks;
    const bookmark = _.filter(byId, (bookmark) => {
      if (bookmark.user_id === userId) {
        bookmarkId = bookmark.id;
        return true;
      }
    })[0];

    bookmark.book_ids.push(bookId);
    bookmark.book_ids.sort();
    this._data.bookmarks.byId[bookmarkId] = bookmark;

    return bookmark;
  }

  removeToById(userId, bookId) {
    let bookmarkId;
    const { bookmarks } = this._data;
    const { byId } = bookmarks;
    const bookmark = _.filter(byId, (bookmark) => {
      if (bookmark.user_id === userId) {
        bookmarkId = bookmark.id;
        return true;
      }
    })[0];

    const idx = bookmark.book_ids.indexOf(bookId);
    if (idx > -1) {
      bookmark.book_ids.splice(idx, 1);
      bookmark.book_ids.sort();
      this._data.bookmarks.byId[bookmarkId] = bookmark;
    }

    return bookmark;
  }

  get() {
    return this._data;
  }
}
export { Bookmark };
