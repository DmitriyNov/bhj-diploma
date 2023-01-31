class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.user = user;
  }

  static unsetCurrent() {
    delete localStorage.user;
  }

  static current() {
    return localStorage.user;
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response); // Не уверен, что всё правильно сделал
      }
    });
  }

  // Метод ниже уже был написан, так и нужно?
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
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
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}
