class Auth {
  constructor() {
    if (!Auth.instance) {
      Auth.instance = this;
    }

    return Auth.instance;
  }
  isValidUid(uid) {
    return (
      typeof uid === 'number' &&
      [1, 2, 3].indexOf(uid) !== -1
    );
  }
  setId(uid) {
    this.uid = uid;
  }

  getId() {
    return uid;
  }
}

export default Auth;
