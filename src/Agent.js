import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';
import RNFetchBlob from 'react-native-fetch-blob';

import { Bookmark as BookmarkData } from '../json/bookmarks';
import { Book as BookData } from '../json/books';
import { User as UserData } from '../json/users';
import { Tag as TagData } from '../json/tags';
import { Collection as CollectionData } from '../json/collections';

const LOCAL_SERVER = 'http://10.0.2.2:8080';
const IMG_SERVER = 'http://10.0.2.2:3000'

const getResponse = ({ data, status }) => ({ data, status });

const requests = {
  get: async (rootUrl, route = '', config = {}) => {
    const response = await axios.get(`${rootUrl}${route}`, config);
    return getResponse(response);
  },
  post: async (rootUrl, route = '', body = {}, config = {}) => {
    const response = await axios.post(`${rootUrl}${route}`, body, config);
    return getResponse(response);
  },
  put: async (rootUrl, route = '', config = {}) => {
    const response = await axios.put(`${rootUrl}${route}`, config);
    return getResponse(response);
  },
  delete: async (rootUrl, route = '', config = {}) => {
    const response = await axios.delete(`${rootUrl}${route}`, config);
    return getResponse(response);
  }
};
const Upload = async () => {
  const imgUrl = 'https://cdn.pixabay.com/photo/2017/12/19/21/16/swans-3028727_150.jpg';
  // const data = new FD();
  // data.append('file', {
  //   uri: imgUrl,
  //   name: 'swans.jpg',
  //   type: 'image/jpg'
  // });
  const res = await RNFetchBlob.fetch('POST', IMG_SERVER, {
    'Content-Type': 'multipart/form-data'
  }, [{
    name: 'file',
    filename: 'swans.jpg',
    type: 'image/jpg',
    data: RNFetchBlob.wrap(imgUrl)
  }])
  console.log('res', res);
};
const Book = {
  __fetchAll: async(nof, page) => {
    const { data, response } = await requests.get(LOCAL_SERVER, '/books', {
      params: {
        nof,
        page
      }
    });
    return data;
  },
  // o
  fetchByTag: async (titleTagId, authorTagId, numOfFeeds, page) => {
    const filteredBooks = await new BookData().getByTagId(titleTagId, authorTagId, numOfFeeds, page);
    return filteredBooks;
  },
  __fetchAllByTag: async (athrid, titid, nof, page) => {
    const { data, status } = await requests.get(LOCAL_SERVER, '/books/tag', {
      params: {
        athrid,
        titid,
        nof,
        page
      }
    });
    return data;
  },
  __fetchAllById: async (bid, nof, page) => {
    const { data, status } = await requests.get(LOCAL_SERVER, '/books/book', {
      params: {
        nof,
        page,
        bid
      }
    });
    return data;
  },
  __fetchByAuthorTag: async (bid, nof, page) => {
    const { data, status } = await requests.get(LOCAL_SERVER, '/books/author_tag', {
      params: {
        nof,
        page,
        bid
      }
    });
    return data;
  },
  // o
  fetchByUserId: async (userId) => {
    const books = await new BookData().get().books.byId;
    return _.filter(books, (book) => {
      return book.user_id === userId;
    });
  },
  // o
  fetchByBookId: async (bookId) => {
    const books = await new BookData().get().books.byId;
    return _.filter(books, (book) => {
      return book.id === bookId;
    })[0];
  },
  __fetchByBookId: async (bid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/book/${bid}`);
    return data;
  },
  // o
  fetchByBookIds: async (bookIds) => {
    const books = await new BookData().getByBookIds(bookIds);
    return books;
  },
  // o
  insert: async (book) => {
    const insertedBook = await new BookData().insert(book);
    return insertedBook;
  },
  // not need
  updateTagIds: async (bookId, titleTagId, authorTagId) => {
    const updatedBook = await new BookData().updateTagIds(bookId, { titleTagId, authorTagId });
    return updatedBook;
  },
  __fetchTag: async (bid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/tag/book/${bid}`);
    return data;
  }
};

const User = {
  // o
  fetchByUserId: async (userId) => {
    const users = await new UserData().get().users.byId;
    return _.filter(users, (user) => {
      return user.id === userId;
    })[0];
  },
  __fetchByUserId: async (uid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}`);
    return data;
  },
  // o
  fetchByUserIds: async (userIds) => {
    const users = await new UserData().getByUserIds(userIds);
    return users;
  },
  __fetchByUserIds: async(uids) => {
    await requests.get(LOCAL_SERVER, '/users', {
      params: { uids },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    });
  },
  // CollectionDao에서 => o
  insertCollection: async (userId, collectionId) => {
    const newUser = await new UserData().setCollection(userId, collectionId);
    return newUser;
  },
  // CollectionDao에서 => o
  deleteCollection: async (userId, collectionId) => {
    const newUser = await new UserData().deleteCollection(userId, collectionId);
    return newUser;
  },
  // x => BookDao에서
  insertBook: async (userId, bookId) => {
    const newUser = await new UserData().setBook(userId, bookId);
    return newUser;
  },
  __fetchCollections: async (uid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}/collections`);
    return data;
  },
  __fetchBooks: async (uid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}/books`);
    return data;
  }
};

const Bookmark = {
  __fetchByUserId: async (uid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/bookmarks/user/${uid}`);
    return data;
  },
  __add: async (bid, uid) => {
    const { status } = await requests.put(LOCAL_SERVER, `/user/${uid}/bookmark/${bid}`);
  },
  __remove: async (bid, uid) => {
    const { status } = await requests.delete(LOCAL_SERVER, `/user/${uid}/bookmark/${bid}`);
  }
};

const Tag = {
  __fetch: async (athrid, titid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/tag/${athrid}/${titid}`);
    return data;
  }
};

const Collection = {
  // o
  fetchById: async (collectionId) => {
    const collections = await new CollectionData().get().collections.byId;
    const collection = collections[collectionId];
    return collection;
  },
  __fetchById: async (cid) => {
    const { data, status } = await requests.get(LOCAL_SERVER, `/collection/${cid}/books`);
    return data;
  },
  // o
  fetchByIds: async (collectionIdArray) => {
    const collections = await new CollectionData().get().collections.byId;
    return _.map(collectionIdArray, (collectionId) => {
      return collections[collectionId];
    });
  },
  __insertCollection: async (uid, label, bids) => {
    const { status } = await requests.post(LOCAL_SERVER, '/collection', {
      uid,
      label,
      bids
    });
  },
  deleteCollection: async (cid) => {
    const removedCollection = await new CollectionData().delete(cid);
    return removedCollection;
  },
  __deleteCollection: async (cid) => {
    const { status } = await requests.delete(LOCAL_SERVER, `/collection/${cid}`);
  },
  __updateBookToCollection: async (cid, bid) => {
    const { data, status } = await requests.put(LOCAL_SERVER, `/collection/${cid}/book/${bid}`);
    return data;
  },
  deleteCollectionBooks: async (id, bookIds) => {
    removedCollection = await new CollectionData().deleteBooks(id, bookIds);
    return removedCollection;
  },
  __deleteCollectionBooks: async (cid, bid) => {
    const { status } = await requests.delete(LOCAL_SERVER, `/collection/${cid}/book/${bid}`);
  }
};

const Search = {
  __search: async (st) => {
    const { data, status } = await requests.get(LOCAL_SERVER, '/search/tag', {
      params: {
        t: st
      }
    });
    return data;
  },
  fetchBookTagIdAndAuthorTagIdByText: async (bookId, titleText, authorText) => {
    const tagIds = await new TagData().insertTag({ bookId, title: titleText, author: authorText });
    return tagIds;
  }
};

export default {
  Upload,
  Book,
  User,
  Bookmark,
  Tag,
  Collection,
  Search
};
