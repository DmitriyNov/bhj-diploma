class AsyncForm {
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
      } else {
        throw new Error('В конструктор класса AsyncForm не был передан элемент');
      }
    } catch (err) {
      console.log(err);
    }
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const entries = formData.entries();
    const result = {};
    for (let element of entries) {
      result[element[0]] = element[1];
    }
    return result;
  }

  onSubmit(options){
  }

  submit() {
    this.onSubmit(this.getData());
  }
}