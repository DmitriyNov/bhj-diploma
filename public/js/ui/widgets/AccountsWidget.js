class AccountsWidget {
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
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
    createButton.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });
    this.element.addEventListener('click', (event) => {
      const curentAccount = event.target.closest('.account');
      if (curentAccount) {
        App.getWidget('accounts').onSelectAccount(curentAccount);
      }
    })
  }
  

  update() {
    if (User.current()) {
      Account.list(null, function (error, response) {
        if (response.success) {
          App.getWidget('accounts').clear();
          response.data.forEach(function (element) {
            App.getWidget('accounts').renderItem(element);
          });
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
