class RegisterForm extends AsyncForm {
  onSubmit(data) {
    User.register(data, (error, response) => {
      if (response.success) {
        document.querySelector("#register-form").reset();
        App.setState('user-logged');
        App.getModal('register').onClose();
      } else {
        alert(error);
      }
    });
  }
}