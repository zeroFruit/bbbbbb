import _ from 'lodash';
import { List } from 'immutable';

const books = {
  books: {
    byId: {
      1: {
        id: 1,
        img_src: "https://cdn.pixabay.com/photo/2017/10/24/23/45/girl-2886598_150.jpg",
        likes: 26,
        content: "사법권은 법관으로 구성된 법원에 속한다. 대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.",
        views: 221,
        user_id: 1,
        title_tag_id: 1,
        author_tag_id: 1
      },
      "2": {
        "id": 2,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/09/12/background-2887350_150.jpg",
        "likes": 18,
        "content": "헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.",
        "views": 451,
        "user_id": 1,
        title_tag_id: 2,
        author_tag_id: 2
      },
      "3": {
        "id": 3,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/01/21/fire-2886715_150.jpg",
        "likes": 18,
        "content": "정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다. 국가는 평생교육을 진흥하여야 한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다.",
        "views": 118,
        "user_id": 1,
        title_tag_id: 1,
        author_tag_id: 1
      },
      "4": {
        "id": 4,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/00/13/girl-2886637_150.jpg",
        "likes": 15,
        "content": "대법원장의 임기는 6년으로 하며, 중임할 수 없다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.",
        "views": 137,
        "user_id": 2,
        title_tag_id: 1,
        author_tag_id: 1
      },
      "5": {
        "id": 5,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/00/01/santa-claus-2886624_150.jpg",
        "likes": 16,
        "content": "국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다.",
        "views": 259,
        "user_id": 2,
        title_tag_id: 3,
        author_tag_id: 1
      },
      "6": {
        "id": 6,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/24/22/02/pumpkin-soup-2886322_150.jpg",
        "likes": 14,
        "content": "이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.",
        "views": 160,
        "user_id": 3,
        title_tag_id: 4,
        author_tag_id: 3
      },
      "7": {
        "id": 7,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/09/13/bridge-2887353_150.jpg",
        "likes": 20,
        "content": "국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다.",
        "views": 789,
        "user_id": 3,
        title_tag_id: 1,
        author_tag_id: 1
      },
      "8": {
        "id": 8,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/22/14/53/ballerina-2878011_150.jpg",
        "likes": 66,
        "content": "국가안전보장회의는 대통령이 주재한다. 공공필요에 의한 재산권의 수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.",
        "views": 1940,
        "user_id": 3,
        title_tag_id: 2,
        author_tag_id: 2
      },
      "9": {
        "id": 9,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/24/10/58/halloween-2884162_150.png",
        "likes": 22,
        "content": "국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.",
        "views": 603,
        "user_id": 3,
        title_tag_id: 1,
        author_tag_id: 1
      },
      "10": {
        "id": 10,
        "img_src": "https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_150.jpg",
        "likes": 17,
        "content": "법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다.",
        "views": 816,
        "user_id": 4,
        title_tag_id: 1,
        author_tag_id: 1
      },
    },
    "allIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
};


class Book {
  constructor() {
    if (!Book.instance) {
      this._data = books;
      Book.instance = this;
    }

    return Book.instance;
  }

  set(newbooks) {
    this._data = newbooks;
  }

  setAllIds(allIds) {
    this._data.books.allIds = allIds;
  }

  setBookToById(bid, book) {
    const byId = this.getById();
    this._data.books.byId = { ...byId, [bid]: book };
  }

  pushIdToAllIds(bid) {
    const allIds = List(this._data.books.allIds).push(bid).sort();
    this.setAllIds(allIds.toJS());
  }

  get() {
    return this._data;
  }

  getId() {
    return _.takeRight(this._data.books.allIds)[0] + 1;
  }

  getById() {
    return this._data.books.byId;
  }

  getAllIds() {
    return this._data.books.allIds;
  }

  getByBookId(bookId) {
    const byId = this.getById();
    return _.filter(byId, (book) => {
      return book.id === bookId;
    })[0];
  }
  getByBookIds(bookIds) {
    const byId = this.getById();
    const filteredBooks = _.map(bookIds, (bookId) => {
      return { ...byId[bookId] };
    });
    return filteredBooks;
  }

  getByTagId(titleTagId, authorTagId, numOfFeeds, page) {
    const byId = this.getById();
    const filteredBook = _.filter(byId, (book) => {
      return (
        book.title_tag_id === titleTagId &&
        book.author_tag_id === authorTagId
      );
    });
    return _.slice(filteredBook, page * numOfFeeds, (page + 1) * numOfFeeds);
  }

  getByAuthorTagId(authorTagId, numOfFeeds, page) {
    const byId = this.getById();
    const filteredBook = _.filter(byId, (book) => {
      return (
        book.author_tag_id === authorTagId
      );
    });
    return _.slice(filteredBook, page * numOfFeeds, (page + 1) * numOfFeeds);
  }

  insert(book) {
    const id = this.getId();
    const newBook = { ...book, id };
    this.setBookToById(id, newBook);
    this.pushIdToAllIds(id);
    return newBook;
  }

  updateTagIds(bookId, { titleTagId, authorTagId }) {
    const book = this.getByBookId(bookId);
    const newBook = { ...book, title_tag_id: titleTagId, author_tag_id: authorTagId };
    this.setBookToById(bookId, newBook);
    return newBook;
  }
}
export { Book };
