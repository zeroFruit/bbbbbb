const tags = {
  book_title_tags: {
    byId: {
      1: {
        id: 1,
        book_title: '에로스의 종말',
        book_ids: [],
        map_ids: [1]
      },
      2: {
        id: 2,
        book_title: '끌림',
        book_ids: [],
        map_ids: [2]
      },
      3: {
        id: 3,
        book_title: '피로사회',
        book_ids: [],
        map_ids: [1]
      },
      4: {
        id: 4,
        book_title: '자존감 수업',
        book_ids: [],
        map_ids: [3]
      }
    },
    allIds: [1, 2, 3, 4]
  },
  book_author_tags: {
    byId: {
      1: {
        id: 1,
        book_author: '한병철',
        book_ids: [],
        map_ids: [1, 3]
      },
      2: {
        id: 2,
        book_author: '이병률',
        book_ids: [],
        map_ids: [2]
      },
      3: {
        id: 3,
        book_author: '윤홍균',
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
}

export { Tag };
