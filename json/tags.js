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
      Tag.instance = this;
    }

    return Tag.instance;
  }

  set(newTags) {
    this._data = newTags;
  }

  get() {
    return this._data;
  }

  getBookAuthorTags() {
    return this._data.book_author_tags.byId;
  }

  getBookTitleTags() {
    return this._data.book_title_tags.byId;
  }

  getTagMaps() {
    return this._data.title_author_tag_map.byId;
  }

  findTagsByAuthor(author) {
    const result = [];
    const refined = author.replace(/\s/g, '').toLowerCase();
    const authorTags = this.getBookAuthorTags();
    const titleTags = this.getBookTitleTags();
    const tagMaps = this.getTagMaps();

    const filteredAuthorTags = refined === '' ? [] : _.filter(authorTags, (authorTag) => {
      const refinedTag = authorTag.book_author.replace(/\s/g, '').toLowerCase();
      return refinedTag.indexOf(refined) !== -1;
    });

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

  findTagsByBookTitle(title) {
    const result = [];
    const refined = title.replace(/\s/g, '').toLowerCase();
    const authorTags = this.getBookAuthorTags();
    const titleTags = this.getBookTitleTags();
    const tagMaps = this.getTagMaps();

    const filteredTitleTags = refined === '' ? [] : _.filter(titleTags, (titleTag) => {
      const refinedTag = titleTag.book_title.replace(/\s/g, '').toLowerCase();
      return refinedTag.indexOf(refined) !== -1;
    });

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
}

export { Tag };
