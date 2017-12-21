import { List } from 'immutable';
import { call, put } from 'redux-saga/effects';
import { hasPath, omit } from '../utils/ObjectUtils';

export function* fetchEntity(entity, ...args) {
  yield put(entity.ready());
  const result = yield call(entity.api, ...args);
  if (hasPath(entity, 'fetch')) {
    yield call(entity.fetch, result);
  }
  yield put(entity.success(result));
  return result;
}

export const MapperBooksAndUsers = (result) => {
  const users = [];
  const books = [];
  result.forEach((r) => {
    const _r = omit(r, ['user', 'imgSrc']);
    books.push({
      ..._r,
      img_src: r.imgSrc,
      user_id: r.user.id
    });
    users.push({
      ...r.user,
      display_name: r.user.displayName
    });
  });
  return {
    users,
    books
  };
};

export const MapperBookAndUser = (r) => {
  return {
    book: {
      ...omit(r, ['user', 'imgSrc']),
      img_src: r.imgSrc,
      user_id: r.user.id
    },
    user: {
      ...r.user,
      display_name: r.user.displayName
    }
  }
}
