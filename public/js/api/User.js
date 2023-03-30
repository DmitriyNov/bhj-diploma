class User {
  static URL = '/user';

  static setCurrent(user) {
    const string = JSON.stringify(user)
    localStorage.user = string;
  }

  static unsetCurrent() {
    delete localStorage.user;
  }

  static current() {
    return JSON.parse(localStorage.user);
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  // Метод ниже уже был написан
  static login(data, callback) {
    /// Нужно здесь делать проверку на соответствие агрумента data?
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json', // Зачем нужно это свойство, если у нас в createRequest уже по умолчанию это?
      data,
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    /// Нужно здесь делать проверку на соответствие агрумента data?
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}
