import { types } from '../../ducks/book';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';

export const requestData = {
  myBooks: {
    ready: () => patch(types.FETCH_MY_BOOKS.READY),
    success: pl => patch(types.FETCH_MY_BOOKS.SUCCESS, pl),
    api: bid => api.fetchBookApi(bid)
  },
  selectedBook: {
    ready: () => patch(types.FETCH_BOOK.READY),
    success: pl => patch(types.FETCH_BOOK.SUCCESS, pl),
    api: bid => api.fetchBookApi(bid)
  },
  selectedBooks: {
    ready: () => patch(types.FETCH_BOOKS.READY),
    success: pl => patch(types.FETCH_BOOKS.SUCCESS, pl),
    api: (nof, page) => api.fetchBooksApi(nof, page)
  },
  selectedBooksByTag: {
    ready: () => patch(types.FETCH_BOOKS_BY_TAG.READY),
    success: pl => patch(types.FETCH_BOOKS_BY_TAG.SUCCESS, pl),
    api: (bid, nof, page) => api.fetchBooksByBookIdApi(bid, nof, page)
  },
  selectedBooksByAuthorTag: {
    ready: () => patch(types.FETCH_BOOKS_BY_AUTHOR_TAG.READY),
    success: pl => patch(types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS, pl),
    api: (bid, nof, page) => api.fetchBooksByAuthorTagIdApi(bid, nof, page)
  },
  selectedBooksForCollection: {
    ready: () => patch(types.FETCH_BOOKS_FOR_COLLECTION.READY),
    success: pl => patch(types.FETCH_BOOKS_FOR_COLLECTION.SUCCESS, pl),
    api: bidList => api.fetchBooksByBookIdsApi(bidList)
  },
  selectedBooksForUser: {
    ready: () => patch(types.FETCH_BOOKS_FOR_USER.READY),
    success: pl => patch(types.FETCH_BOOKS_FOR_USER.SUCCESS, pl),
    api: uid => api.fetchBooksByUserIdApi(uid)
  },
  addBook: {
    ready: () => patch(types.ADD_BOOK.READY),
    success: () => patch(types.ADD_BOOK.SUCCESS),
    api: bd => api.addBookApi(bd)
  }
};

export const requestEntity = {
  myBooks: fetchEntity.bind(null, requestData.myBooks),
  selectedBook: fetchEntity.bind(null, requestData.selectedBook),
  selectedBooks: fetchEntity.bind(null, requestData.selectedBooks),
  selectedBooksByTag: fetchEntity.bind(null, requestData.selectedBooksByTag),
  selectedBooksByAuthorTag: fetchEntity.bind(null, requestData.selectedBooksByAuthorTag),
  selectedBooksForCollection: fetchEntity.bind(null, requestData.selectedBooksForCollection),
  selectedBooksForUser: fetchEntity.bind(null, requestData.selectedBooksForUser),
  addBook: fetchEntity.bind(null, requestData.addBook)
};
