class AccountsWidget {
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.update();
      } else {
        throw new Error('В конструктор класса AccountsWidget не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }

  registerEvents() {
    const createButton = this.element.querySelector('.create-account');
    const accounts = document.querySelectorAll('.account');
    createButton.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });
    accounts.forEach(function (element) {
      element.addEventListener('click', (event) => {
        App.getWidget('accounts').onSelectAccount(event.currentTarget);
      })
    });
  }
  

  update() {
    if (User.current()) {
      Account.list(null, function (error, response) {
        if (response.success) {
          App.getWidget('accounts').clear();
          response.data.forEach(function (element) {
            App.getWidget('accounts').renderItem(element);
          });
          // В общем, я немного пошёл в разрез с заданием, там нужно было вызывать registerEvents в конструкторе, я делаю здесь, после рендера списка счетов
          App.getWidget('accounts').registerEvents();
        } else {
          console.log(error);
        }
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach((element) => {
      element.remove();
    })
  }

  onSelectAccount(element) {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach((element) => {
      element.classList.remove('active');
    })
    element.classList.add('active');
    App.showPage('transactions', {account_id: element.dataset.id});
  }

  getAccountHTML(item) {
    return `
    <li class="active account" data-id="${item.id}">
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>`
  }

  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}
