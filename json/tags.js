import _ from 'lodash';
import { List } from 'immutable';

const tags = {
  book_title_tags: {
    byId: {
      1: {
        id: 1,
        book_title: 'Wonder',
        book_ids: [1, 3, 4, 7, 9, 10],
        map_ids: [1]
      },
      2: {
        id: 2,
        book_title: 'Obama : An Intimate Portrait',
        book_ids: [2, 8],
        map_ids: [2]
      },
      3: {
        id: 3,
        book_title: 'Auggie & Me',
        book_ids: [5],
        map_ids: [1]
      },
      4: {
        id: 4,
        book_title: 'Harry Potter and the Prisoner of azkaban',
        book_ids: [6],
        map_ids: [4]
      }
    },
    allIds: [1, 2, 3, 4]
  },
  book_author_tags: {
    byId: {
      1: {
        id: 1,
        book_author: 'R. J. Palacio',
        map_ids: [1, 3]
      },
      2: {
        id: 2,
        book_author: 'Pete Souza',
        map_ids: [2]
      },
      3: {
        id: 3,
        book_author: 'J. K. Rowling',
        map_ids: [4]
      }
    },
    allIds: [1, 2, 3]
  },
  title_author_tag_map: {
    byId: {
      1: {
        id: 1,
        title: 1,
        author: 1
      },
      2: {
        id: 2,
        title: 2,
        author: 2
      },
      3: {
        id: 3,
        title: 3,
        author: 1
      },
      4: {
        id: 4,
        title: 4,
        author: 3
      }
    },
    allIds: [1, 2, 3, 4]
  }
};

class Tag {
  constructor() {
    if (!Tag.instance) {
      this._data = tags;
      this._flag = {
        TITLE_EX_AUTHOR_EX: 'TITLE_EX_AUTHOR_EX',
        TITLE_NEX_AUTHOR_EX: 'TITLE_NEX_AUTHOR_EX',
        TITLE_EX_AUTHOR_NEX: 'TITLE_EX_AUTHOR_NEX',
        TITLE_NEX_AUTHOR_NEX: 'TITLE_NEX_AUTHOR_NEX'
      };
      Tag.instance = this;
    }

    return Tag.instance;
  }

  set(newTags) {
    this._data = newTags;
  }

  setTitleTagById(newTitleTag) {
    const titleTags = this.getBookTitleTags();
    this._data.book_title_tags.byId = { ...titleTags, [newTitleTag.id]: { ...newTitleTag } };
  }

  setAuthorTagById(newAuthorTag) {
    const authorTags = this.getBookAuthorTags();
    this._data.book_author_tags.byId = { ...authorTags, [newAuthorTag.id]: { ...newAuthorTag } };
  }

  setTagMapById(newTagMap) {
    const tagMaps = this.getTagMaps();
    this._data.title_author_tag_map.byId = { ...tagMaps, [newTagMap.id]: { ...newTagMap } };
  }


  setTitleTagAllIds(id) {
    this._data.book_title_tags.allIds = List(this._data.book_title_tags.allIds).push(id).sort().toJS();
  }

  setAuthorTagAllIds(id) {
    this._data.book_author_tags.allIds = List(this._data.book_author_tags.allIds).push(id).sort().toJS();
  }

  setTagMapAllIds(id) {
    this._data.title_author_tag_map.allIds = List(this._data.title_author_tag_map.allIds).push(id).sort().toJS();
  }


  get() {
    return this._data;
  }

  getBookTitleTags() {
    return this._data.book_title_tags.byId;
  }

  getBookAuthorTags() {
    return this._data.book_author_tags.byId;
  }

  getTagMaps() {
    return this._data.title_author_tag_map.byId;
  }

  getRefinedText(str) {
    return str.replace(/\s/g, '').toLowerCase();
  }

  getFilteredTitleTags(refinedTitleText) {
    const titleTags = this.getBookTitleTags();

    return _.filter(titleTags, (titleTag) => {
      const refinedTag = this.getRefinedText(titleTag.book_title);
      return refinedTag === refinedTitleText;
    });
  }

  getFilteredAuthorTags(refinedAuthorText) {
    const authorTags = this.getBookAuthorTags();

    return _.filter(authorTags, (authorTag) => {
      const refinedTag = this.getRefinedText(authorTag.book_author);
      return refinedTag === refinedAuthorText;
    });
  }


  getTagMapId() {
    return _.takeRight(this._data.title_author_tag_map.allIds)[0] + 1;
  }

  getTitleTagId() {
    return _.takeRight(this._data.book_title_tags.allIds)[0] + 1;
  }

  getAuthorTagId() {
    return _.takeRight(this._data.book_author_tags.allIds)[0] + 1;
  }


  findFilteredTitleTags(refinedTitleText) {
    const titleTags = this.getBookTitleTags();

    return refinedTitleText === '' ? [] : _.filter(titleTags, (titleTag) => {
      const refinedTag = this.getRefinedText(titleTag.book_title);
      return refinedTag.indexOf(refinedTitleText) !== -1;
    });
  }

  findFilteredAuthorTags(refinedAuthorText) {
    const authorTags = this.getBookAuthorTags();

    return refinedAuthorText === '' ? [] : _.filter(authorTags, (authorTag) => {
      const refinedTag = this.getRefinedText(authorTag.book_author);
      return refinedTag.indexOf(refinedAuthorText) !== -1;
    });
  }

  findTagsByBookTitle(title) {
    const result = [];
    const refined = this.getRefinedText(title);
    const authorTags = this.getBookAuthorTags();
    const tagMaps = this.getTagMaps();

    const filteredTitleTags = this.findFilteredTitleTags(refined);

    _.forEach(filteredTitleTags, (titleTag) => {
      titleTag.map_ids.forEach((id) => {
        result.push({
          author: authorTags[tagMaps[id].author],
          title: titleTag
        });
      });
    });

    return result;
  }

  findTagsByAuthor(author) {
    const result = [];
    const refined = this.getRefinedText(author);
    const titleTags = this.getBookTitleTags();
    const tagMaps = this.getTagMaps();

    const filteredAuthorTags = this.findFilteredAuthorTags(refined);

    _.forEach(filteredAuthorTags, (authorTag) => {
      authorTag.map_ids.forEach((id) => {
        result.push({
          author: authorTag,
          title: titleTags[tagMaps[id].title]
        });
      });
    });

    return result;
  }

  insertTag({ bookId, title, author }) {
    const refinedTitleText = this.getRefinedText(title);
    const refinedAuthorText = this.getRefinedText(author);

    const filteredTitleTags = this.getFilteredTitleTags(refinedTitleText);
    const filteredAuthorTags = this.getFilteredAuthorTags(refinedAuthorText);
    const flag = this.getFlag(filteredTitleTags, filteredAuthorTags);
    switch(flag) {
      case this._flag.TITLE_EX_AUTHOR_EX:
        return this.insertTagTitleExAuthorEx(filteredTitleTags, filteredAuthorTags, bookId);
      case this._flag.TITLE_NEX_AUTHOR_EX:
        return this.insertTagTitleNexAuthorEx(filteredAuthorTags, bookId, title);
      case this._flag.TITLE_EX_AUTHOR_NEX:
      case this._flag.TITLE_NEX_AUTHOR_NEX:
        return this.insertTagTitleNexAuthorNex(bookId, title, author);
    }
  }

  getFlag(titleArr, authorArr) {
    if (titleArr.length !== 0) {
      return (authorArr.length !== 0) ? this._flag.TITLE_EX_AUTHOR_EX : this._flag.TITLE_NEX_AUTHOR_NEX;
    } else {
      return (authorArr.length !== 0) ? this._flag.TITLE_NEX_AUTHOR_EX : this._flag.TITLE_NEX_AUTHOR_NEX;
    }
  }

  insertTagTitleExAuthorEx(filteredTitleTags, filteredAuthorTags, bookId) {
    const titleTag = filteredTitleTags[0];
    const newTitleTag = {
      ...titleTag,
      book_ids: List(titleTag.book_ids).push(bookId).sort().toJS()
    };
    this.setTitleTagById(newTitleTag);

    return {
      title_tag_id: titleTag.id,
      author_tag_id: filteredAuthorTags[0].id
    };
  }

  insertTagTitleNexAuthorEx(filteredAuthorTags, bookId, title) {
    const authorTag = filteredAuthorTags[0];
    const newTagMapId = this.getTagMapId();
    const newTitleTagId = this.getTitleTagId();

    const newTitleTag = {
      id: newTitleTagId,
      book_title: title,
      book_ids: [bookId],
      map_ids: [newTagMapId]
    };
    const newAuthorTag = {
      ...authorTag,
      map_ids: List(authorTag.map_ids).push(newTagMapId).sort().toJS()
    };
    const newTagMap = {
      id: newTagMapId,
      title: newTitleTagId,
      author: authorTag.id
    };

    this.setTitleTagById(newTitleTag);
    this.setAuthorTagById(newAuthorTag);
    this.setTagMapById(newTagMap);

    return {
      title_tag_id: newTitleTagId,
      author_tag_id: authorTag.id
    };
  }

  insertTagTitleNexAuthorNex(bookId, title, author) {
    const newTagMapId = this.getTagMapId();
    const newTitleTagId = this.getTitleTagId();
    const newAuthorTagId = this.getAuthorTagId();

    const newTitleTag = {
      id: newTitleTagId,
      book_title: title,
      book_ids: List([bookId]).toJS(),
      map_ids: List([newTagMapId]).toJS()
    };
    const newAuthorTag = {
      id: newAuthorTagId,
      book_author: author,
      map_ids: List([newTagMapId]).toJS()
    };

    const newTagMap = {
      id: newTagMapId,
      title: newTitleTagId,
      author: newAuthorTagId
    };

    this.setTitleTagById(newTitleTag);
    this.setAuthorTagById(newAuthorTag);
    this.setTagMapById(newTagMap);

    return {
      title_tag_id: newTitleTagId,
      author_tag_id: newAuthorTagId
    };
  }
}

export { Tag };
