import { List } from 'immutable';
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

  describe('createInitState test', () => {
    it('basic - state type is object', () => {
      const _stateType = helper.stateType;
      const base = 'SelectedBook';
      const key = 'Fetch';
      expect(helper.createInitState(base, key, _stateType.OBJ))
        .toEqual({
          base,
          key,
          stateType: _stateType.OBJ,
          isSelectedBookFetch_: false,
          SelectedBook_: {}
        });
    });

    it('basic - state type is List', () => {
      const _stateType = helper.stateType;
      const base = 'SelectedBook';
      const key = 'Fetch';
      expect(helper.createInitState(base, key, _stateType.LIST))
        .toEqual({
          base,
          key,
          stateType: _stateType.LIST,
          isSelectedBookListFetch_: false,
          SelectedBookList_: List().toJS()
        });
    });

    it('basic - state type is number', () => {
      const _stateType = helper.stateType;
      const base = 'SelectedBook';
      const key = 'Fetch';
      expect(helper.createInitState(base, key, _stateType.NUM))
        .toEqual({
          base,
          key,
          stateType: _stateType.NUM,
          isSelectedBookFetch_: false,
          SelectedBook_: 0
        });
    });
    it('basic - state type is none', () => {
      const _stateType = helper.stateType;
      const base = 'SelectedBook';
      const key = 'Fetch';
      expect(helper.createInitState(base, key, _stateType.NONE))
        .toEqual({
          base,
          key,
          stateType: _stateType.NONE,
          isSelectedBookFetch_: false
        });
    });
  });

  describe('setStateFlag test', () => {
    it('should set flag value and return', () => {
      const state = helper.createInitState('SelectedBook', 'Fetch', helper.stateType.LIST);
      expect(helper.setStateFlag(state, true))
        .toEqual({
          ...state,
          [helper.getStateFlagName(state)]: true
        });
    });
  });

  describe('setStatePayload test', () => {
    it('should set list type payload value and return', () => {
      const payload = List([{
        id: 1
      }]).toJS();
      const state = helper.createInitState('SelectedBook', 'Fetch', helper.stateType.LIST);
      expect(helper.setStatePayload(state, payload))
        .toEqual({
          ...state,
          [helper.getStatePayloadName(state)]: payload
        });
    });
  });

  describe('concatStatePayload test', () => {
    it('should concat list type payload value and return', () => {
      const payload = List([{
        id: 1
      }]).toJS();
      const payload2 = List([{
        id: 2
      }]).toJS();
      const state = helper.createInitState('SelectedBook', 'Fetch', helper.stateType.LIST);
      const newState = helper.concatStatePayload(state, payload)
      expect(helper.concatStatePayload(newState, payload2))
        .toEqual({
          ...state,
          [helper.getStatePayloadName(state)]: List([{ id: 1 }, { id: 2 }]).toJS()
        });
    });
  });

  describe('getStateFlag test', () => {
    it('should return state flag value', () => {
      const state = helper.createInitState('SelectedBook', 'Fetch', helper.stateType.LIST);
      expect(helper.getStateFlag(state))
        .toBeFalsy();
    });
  });

  describe('getStatePayload test', () => {
    it('should return state payload value', () => {
      const state = helper.createInitState('SelectedBook', 'Fetch', helper.stateType.LIST);
      const newState = {
        ...state,
        [helper.getStatePayloadName(state)]: List([{ id: 1 }, { id: 2 }]).toJS()
      };
      expect(helper.getStatePayload(newState))
        .toEqual(List([{ id: 1 }, { id: 2 }]).toJS());
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
