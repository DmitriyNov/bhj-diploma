class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (error, response) => {
      if (response.success) {
        document.querySelector("#login-form").reset();
        App.setState('user-logged');
        App.getModal('login').onClose();
      } else {
        alert(error);
      }
    })
  }
}