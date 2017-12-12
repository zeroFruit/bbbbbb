import * as helper from '../../src/ducks/helper';

describe.only('duck helper test', () => {
  describe('createRequestTypes test', () => {
    it('should return request types when _base is String', () => {
      const base = 'FETCH_BOOK';
      expect(helper.createRequestTypes(base))
        .toEqual({
          REQUEST: 'FETCH_BOOK_REQUEST',
          READY: 'FETCH_BOOK_READY',
          SUCCESS: 'FETCH_BOOK_SUCCESS',
          FAILURE: 'FETCH_BOOK_FAILURE'
        });
    });

    it('should return request types when _base is Array', () => {
      const base = ['book', 'FETCH_BOOK'];
      expect(helper.createRequestTypes(base))
        .toEqual({
          REQUEST: 'book/FETCH_BOOK_REQUEST',
          READY: 'book/FETCH_BOOK_READY',
          SUCCESS: 'book/FETCH_BOOK_SUCCESS',
          FAILURE: 'book/FETCH_BOOK_FAILURE'
        });
    });
  });


  describe('createType', () => {
    it('should return action type when _base is String', () => {
      const base = 'FETCH_BOOK';
      expect(helper.createType(base))
        .toEqual('FETCH_BOOK');
    });

    it('should return action type when _base is Array', () => {
      const base = ['book', 'FETCH_BOOK'];
      expect(helper.createType(base))
        .toEqual('book/FETCH_BOOK');
    });
  });


  describe('patch', () => {
    const type = 'FETCH_BOOK';
    const payload = {
      id: 1
    };
    const mergeKeys = 'key';
    const mergeKeysArr = ['key1', 'key2'];
    it('should return reducer object w/o mergeKeys', () => {
      expect(helper.patch(type, payload))
        .toEqual({ type, payload });
    });

    it('should return reducer object w/ String mergeKeys', () => {
      expect(helper.patch(type, payload, mergeKeys))
        .toEqual({ type, payload, mergeKeys: [mergeKeys] });
    });

    it('should return reducer object w/ Array mergeKeys', () => {
      expect(helper.patch(type, payload, mergeKeysArr))
        .toEqual({ type, payload, mergeKeys: mergeKeysArr });
    });
  });

  describe('action', () => {
    it('should return action object w/o payload', () => {
      const type = 'FETCH_BOOK';
      expect(helper.action(type))
        .toEqual({
          type,
          payload: {}
        });
    });
    it('should return action object w/ payload', () => {
      const type = 'FETCH_BOOK';
      const payload = {
        id: 1
      };
      expect(helper.action(type, payload))
        .toEqual({
          type,
          payload
        });
    });
  });
});
