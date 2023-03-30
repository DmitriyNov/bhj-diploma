class AccountsWidget {
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.update();
        this.registerEvents();
      } else {
        throw new Error('В конструктор класса AccountsWidget не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }

  registerEvents() {
    const createButton = this.element.querySelector('.create-account');
    console.log(this.element);
    const accounts = document.querySelectorAll('.account');
    console.log(accounts);
    // Я вообще не понимаю, что здесь не так. Почему-то в accounts пустой нод-лист, в консоли этот код работает.
    createButton.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });
    accounts.forEach(function (element) {
      element.addEventListener('click', (event) => {
        // не знаю, как вызвать здесь этот метод, только забиндить?
        this.onSelectAccount(event.currentTarget);
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
