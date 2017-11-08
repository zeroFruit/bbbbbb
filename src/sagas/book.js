// import { call, put, takeLatest } from 'redux-saga/effects';
// import { types } from '../ducks/book';
// import agent from '../Agent';
//
// export function* AsyncFetchBookRequest(action) {
//   const { book_ids } = yield call(agent.Book.fetchByUserId, action.payload);
//
//   yield put({
//     type: types.FETCH_BOOKMARK_SUCCESS,
//     payload: book_ids
//   });
// }
//
// const root = function* rootSaga() {
//   yield takeLatest(types.FETCH_BOOKMARK_REQEUST, AsyncFetchBookmarkRequest);
// }
//
// export default root;
