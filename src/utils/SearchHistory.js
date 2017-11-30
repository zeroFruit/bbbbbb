import { List } from 'immutable';

const NUM_OF_HISTORY = 5;

export default class SearchHistory {
  constructor() {
    if (!SearchHistory.instance) {
      this.history = List();
      SearchHistory.instance = this;
    }

    return SearchHistory.instance;
  }

  insertSearchText(searchText) {
    this.history.unshift(searchText);

    if (this.getHistorySize() > NUM_OF_HISTORY) {
      this.history.pop();
    }
  }

  getHistorySize() {
    return this.history.size;
  }

  getHistory() {
    return this.history.toJS();
  }
}
