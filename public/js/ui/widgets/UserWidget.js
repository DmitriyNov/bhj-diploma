class UserWidget {
  constructor(element){
    try {
      if (element) {
        this.element = element;
        this.update();
      } else {
        throw new Error('В конструктор класса UserWidget не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }

  update() {
    if (User.current()) {
      this.element.querySelector('.user-name').textContent = User.current().name;
    }
  }
}
