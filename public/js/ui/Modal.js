class Modal {
  constructor(element){
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
      } else {
        throw new Error('В конструктор класса Modal не был передан элемент');
      }
    } catch (err) {
      console.log(err); // Правильно понимаю, что эта ошибка только для отладки, и, кроме как выводить в консоль, с ней ничего делать не нужно?
    }
  }

  registerEvents() {
    const modals = this.element.querySelectorAll('[data-dismiss="modal"]');
    modals.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        this.onClose();
      })
    })
  }

  onClose(e) {
    // Пока не понял, что здесь за параметр передаётся и что с ним делать
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close(){
    this.element.style.display = 'none';
  }
}