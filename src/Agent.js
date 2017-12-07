import axios from 'axios';
import _ from 'lodash';
import { Bookmark as BookmarkData } from '../json/bookmarks';
import { Book as BookData } from '../json/books';
import { User as UserData } from '../json/users';
import { Tag as TagData } from '../json/tags';
import { Collection as CollectionData } from '../json/collections';

import { sliceArray } from './utils/ArrayUtils';

const PIXABAY_KEY = '6842683-d26f890a7f99fb95ff9928611';
const ASSET_SERVER_URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}`;

const getResponseBody = res => { return res.data; };

const requests = {
  get: (rootUrl, route = '', config = {}) => {
    return axios.get(`${rootUrl}${route}`, config).then(getResponseBody);
  }
};

const Book = {
  fetch: async (numOfFeedsPerLoad, page) => {
    const { byId, allIds } = await new BookData().get().books;
    const slicedIds = sliceArray(allIds, page * numOfFeedsPerLoad, (page + 1) * numOfFeedsPerLoad);
    return _.map(slicedIds, (id) => {
      return byId[id];
    });
  },
  fetchByTag: async (titleTagId, authorTagId, numOfFeeds, page) => {
    const filteredBooks = await new BookData().getByTagId(titleTagId, authorTagId, numOfFeeds, page);
    return filteredBooks;
  },
  fetchByUserId: async (userId) => {
    const books = await new BookData().get().books.byId;
    return _.filter(books, (book) => {
      return book.user_id === userId;
    });
  },
  fetchByBookId: async (bookId) => {
    const books = await new BookData().get().books.byId;
    return _.filter(books, (book) => {
      return book.id === bookId;
    })[0];
  },
  fetchByBookIds: async (bookIds) => {
    const books = await new BookData().getByBookIds(bookIds);
    return books;
  },
  insert: async (book) => {
    const insertedBook = await new BookData().insert(book);
    return insertedBook;
  }
};

const User = {
  fetchByUserId: async (userId) => {
    const users = await new UserData().get().users.byId;
    return _.filter(users, (user) => {
      return user.id === userId;
    })[0];
  },
  fetchByUserIds: async (userIds) => {
    const users = await new UserData().getByUserIds(userIds);
    return users;
  },
  insertCollection: async (userId, collectionId) => {
    const newUser = await new UserData().setCollection(userId, collectionId);
    return newUser;
  },
  deleteCollection: async (userId, collectionId) => {
    const newUser = await new UserData().deleteCollection(userId, collectionId);
    return newUser;
  },
  insertBook: async (userId, bookId) => {
    const newUser = await new UserData().setBook(userId, bookId);
    return newUser;
  }
};

const Bookmark = {
  fetchByUserId: async (userId) => {
    const bookmarks = await new BookmarkData().get().bookmarks.byId;
    return _.filter(bookmarks, (bookmark) => {
      return bookmark.user_id === userId;
    })[0];
  },
  addByBookId: async (bookId, userId) => {
    const bookmarks = await new BookmarkData().setToById(userId, bookId);
    return bookmarks;
  },
  removeByBookId: async (bookId, userId) => {
    const bookmarks = await new BookmarkData().removeToById(userId, bookId);
    return bookmarks;
  }
};

const Tag = {
  fetchByAuthorTagIdAndBookTagId: async (authorTagId, bookTagId) => {
    const { book_title_tags, book_author_tags } = await new TagData().get();
    const { book_title } = book_title_tags.byId[bookTagId];
    const { book_author } = book_author_tags.byId[authorTagId];
    return {
      bookTitle: book_title,
      bookAuthor: book_author
    };
  }
};

const Collection = {
  fetchById: async (collectionId) => {
    const collections = await new CollectionData().get().collections.byId;
    const collection = collections[collectionId];
    return collection;
  },
  fetchByIds: async (collectionIdArray) => {
    const collections = await new CollectionData().get().collections.byId;
    return _.map(collectionIdArray, (collectionId) => {
      return collections[collectionId];
    });
  },
  insertCollection: async (label, bookIds) => {
    const newCollection = await new CollectionData().insert(label, bookIds);
    return newCollection;
  },
  deleteCollection: async (id) => {
    const removedCollection = await new CollectionData().delete(id);
    return removedCollection;
  },
  updateBooksToCollection: async (cid, bids) => {
    const updatedCollection = await new CollectionData().updateBooks(cid, bids);
    return updatedCollection;
  },
  deleteCollectionBooks: async (id, bookIds) => {
    removedCollection = await new CollectionData().deleteBooks(id, bookIds);
    return removedCollection;
  }
};

const Search = {
  fetchBookLabelByText: async (searchText) => {
    const tag = new TagData();
    const results = await Promise.all([tag.findTagsByAuthor(searchText), tag.findTagsByBookTitle(searchText)]);

    return _.union(results[0], results[1]);
  }
};

export default {
  Book,
  User,
  Bookmark,
  Tag,
  Collection,
  Search
};
