class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const list = this.element.querySelector('.accounts-select');
    Account.list(null, function (error, response) {
      list.innerHTML = '';
      if (response.success) {
        response.data.forEach(function (element) {
          list.insertAdjacentHTML('beforeend', `<option value="${element.id}">${element.name}</option>`);
        });
      } else {
        console.log(error);
      }
    });
  }

  onSubmit(data) {
    const form = this.element;
    Transaction.create(data, (error, response) => {
      if (response.success) {
        form.reset();
        App.getModal('newIncome').onClose();
        App.getModal('newExpense').onClose();
        App.update();
      } else {
        console.log(error);
      }
    });
  }
}