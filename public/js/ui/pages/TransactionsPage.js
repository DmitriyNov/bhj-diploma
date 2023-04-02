class TransactionsPage {
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
      } else {
        throw new Error('В конструктор класса TransactionsPage не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
    this.render();
  }

  registerEvents() {
    const deleteAccount = this.element.querySelector('.remove-account');
    const deleteTransactions = this.element.querySelectorAll('.transaction__remove');
    deleteAccount.addEventListener('click', () => {
      App.getPage('transactions').removeAccount();
    });
    deleteTransactions.forEach(function (element) {
      element.addEventListener('click', () => {
        App.getPage('transactions').removeTransaction(element.dataset.id);
      })
    });
  }

  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove({id: this.lastOptions['account_id']}, function (error, response) {
        if (response.success) {
          App.getPage('transactions').clear();
          App.updateWidgets();
          App.updateForms();
        } else {
          console.log(error);
        }
      });
    }
  }

  removeTransaction(id) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({id: id}, function (error, response) {
        if (response.success) {
          App.update()
        } else {
          console.log(error);
        }
      });
    }
  }

  render(options) {
    if (!options) {
      console.log('В метод render класса TransactionsPage не был передан аргумент');
      return;
    }
    this.lastOptions = options;
    Account.get(options['account_id'], function (error, response) {
      if (response.success) {
        App.getPage('transactions').renderTitle(response.data.name);
      } else {
        console.log(error);
      }
    });
    // Сначала мучался c тем, что от сервера приходит ответ с пучтым массивом в date, оказалось нужно передавать в Transaction.list не значение account_id, а весь объект options
    // Почему в этом классе так, а в Account.get нухно передавать не объект, а значение?
    Transaction.list(options, function (error, response) {
      if (response.success) {
        App.getPage('transactions').renderTransactions(response.data);
      } else {
        console.log(error);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  renderTitle(name){
    this.element.querySelector('.content-title').textContent = name;
  }
  
  formatDate(date){
    const time = new Date(date);
    // Вот этот вариант мне не очень нравится, но я не знаю, каким образом из Date извлечь месяц на кириллице
    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${time.getDate()} ${month[time.getMonth()]} ${time.getFullYear()} г. в ${time.getHours() < 10 ? 0 : ''}${time.getHours()}:${time.getMinutes()}`;
  }

  getTransactionHTML(item){
    return `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item['created_at'])}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>`
  }

  renderTransactions(data){
    const content = document.querySelector('.content');
    content.innerHTML = '';
    data.forEach((item) => {
      content.insertAdjacentHTML('beforeend', this.getTransactionHTML(item));
    });
    this.registerEvents();
  }
}