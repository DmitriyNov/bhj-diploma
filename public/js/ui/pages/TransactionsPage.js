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

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {

  }

  registerEvents() {
    const accounts = this.element.querySelectorAll('.remove-account');
    const transactions = this.element.querySelectorAll('.transaction__remove');
    accounts.forEach(function (element) {
      element.addEventListener('click', () => {
        this.removeAccount();
      })
    });
    transactions.forEach(function (element) {
      element.addEventListener('click', () => {
        this.removeTransaction(element.dataset.id);
      })
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (!options) {
      console.log('В метод render класса TransactionsPage не был передан аргумент');
      return;
    }
    this.lastOptions = options;
    Account.get(options['account_id'], function (error, response) {
      if (response.success) {
        console.log(this);
        this.renderTitle(response.data.name);
      } else {
        console.log(error);
      }
    });
    Transaction.list(null, function (error, response) {
      if (response.success) {
        console.log(this);
        this.renderTransactions();
      } else {
        console.log(error);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){

  }
}