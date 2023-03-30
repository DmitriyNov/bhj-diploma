class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (error, response) => {
      if (response.success) {
        document.querySelector("#new-account-form").remove();
        App.getModal('createAccount').onClose();
        App.update();
      } else {
        console.log(error);
      }
    });
  }
}