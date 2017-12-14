import {
  types,
  initialState as is
} from '../../ducks/book';
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
  }
};

export const requestEntity = {
  myBooks: fetchEntity.bind(null, requestData.myBooks),
  selectedBook: fetchEntity.bind(null, requestData.selectedBook),
  selectedBooks: fetchEntity.bind(null, requestData.selectedBooks),
  selectedBooksByTag: fetchEntity.bind(null, requestData.selectedBooksByTag),
  selectedBooksByAuthorTag: fetchEntity.bind(null, requestData.selectedBooksByAuthorTag)
};
