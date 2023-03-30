class TransactionsWidget {
  constructor( element ) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
      } else {
        throw new Error('В конструктор класса TransactionsWidget не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  registerEvents() {
    const income = this.element.querySelector('.create-income-button');
    const expense = this.element.querySelector('.create-expense-button');
    income.addEventListener('click', () => {
      App.getModal('newIncome').open();
    });
    expense.addEventListener('click', () => {
      App.getModal('newExpense').open();
    });
  }
}
