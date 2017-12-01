import _ from 'lodash';
import { List } from 'immutable';

const tags = {
  book_title_tags: {
    byId: {
      1: {
        id: 1,
        book_title: 'wonder',
        book_ids: [],
        map_ids: [1]
      },
      2: {
        id: 2,
        book_title: 'obama:anintimateportrait',
        book_ids: [],
        map_ids: [2]
      },
      3: {
        id: 3,
        book_title: 'auggie&me',
        book_ids: [],
        map_ids: [1]
      },
      4: {
        id: 4,
        book_title: 'harrypotterandtheprisonerofazkaban',
        book_ids: [],
        map_ids: [4]
      }
    },
    allIds: [1, 2, 3, 4]
  },
  book_author_tags: {
    byId: {
      1: {
        id: 1,
        book_author: 'r.j.palacio',
        book_ids: [],
        map_ids: [1, 3]
      },
      2: {
        id: 2,
        book_author: 'petesouza',
        book_ids: [],
        map_ids: [2]
      },
      3: {
        id: 3,
        book_author: 'j.k.rowling',
        book_ids: [],
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
    const refined = author.replace(/\s/g, '').toLowerCase();
    const authorTags = this.getBookAuthorTags();
    const titleTags = this.getBookTitleTags();
    const tagMaps = this.getTagMaps();

    const filteredAuthorTags = refined === '' ? [] : _.filter(authorTags, (authorTag) => {
      return authorTag.book_author.indexOf(refined) !== -1;
    });
    const mappedAuthorTags = _.map(filteredAuthorTags, (authorTag) => {
      const childTitleTags = authorTag.map_ids.map(id => titleTags[tagMaps[id].title]);
      return {
        author: [authorTag],
        titles: childTitleTags
      };
    });

    return mappedAuthorTags;
  }

  findTagsByBookTitle(title) {
    const refined = title.replace(/\s/g, '').toLowerCase();
    const authorTags = this.getBookAuthorTags();
    const titleTags = this.getBookTitleTags();
    const tagMaps = this.getTagMaps();

    const filteredTitleTags = refined === '' ? [] : _.filter(titleTags, (titleTag) => {
      return titleTag.book_title.indexOf(refined) !== -1;
    });
    const mappedTitleTags = _.map(filteredTitleTags, (titleTag) => {
      const childAuthorTags = titleTag.map_ids.map(id => authorTags[tagMaps[id].author]);
      return {
        author: childAuthorTags,
        titles: [titleTag]
      };
    });

    return mappedTitleTags;
  }
}

export { Tag };
